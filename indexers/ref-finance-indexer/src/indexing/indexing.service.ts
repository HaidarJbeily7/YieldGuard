// src/indexing/indexing.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { ConfigService } from '@nestjs/config';
import { connect, keyStores } from 'near-api-js';

@Injectable()
export class IndexingService implements OnModuleInit {
  private readonly logger = new Logger(IndexingService.name);
  private nearConnection: any;
  private contractAddresses: string[] = []; // Multiple addresses

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Initialize NEAR connection
    this.nearConnection = await connect({
      networkId: 'mainnet',
      nodeUrl: this.configService.get('NEAR_RPC_URL'), // e.g., "https://rpc.mainnet.near.org"
      keyStore: new keyStores.InMemoryKeyStore(),
      headers: {},
    });

    // Load multiple addresses from .env or config
    // Format: "contract1.near,contract2.near"
    const addressesString = this.configService.get('NEAR_CONTRACT_ADDRESSES');
    this.contractAddresses = addressesString ? addressesString.split(',') : [];

    this.logger.log(
      `NEAR connection established. Contracts: ${this.contractAddresses.join(', ')}`,
    );
  }

  // This could be triggered by a cron job or manually from a controller
  async indexLatestBlocks(): Promise<void> {
    try {
      const latestBlock = await this.nearConnection.connection.provider.block({
        finality: 'final',
      });
      const blockHeight = latestBlock.header.height;

      // For each chunk, fetch transactions
      const chunkPromises = latestBlock.chunks.map(async (chunkHeader) => {
        const chunkDetails =
          await this.nearConnection.connection.provider.chunk(
            chunkHeader.chunk_hash,
          );
        return chunkDetails.transactions;
      });

      const allTransactions = (await Promise.all(chunkPromises)).flat();

      for (const tx of allTransactions) {
        // Get detailed transaction status
        const txStatus = await this.nearConnection.connection.provider.txStatus(
          tx.hash,
          tx.signer_id,
        );

        // Extract relevant receipts for any contract in contractAddresses
        for (const contractAddress of this.contractAddresses) {
          const contractRelatedActions = this.extractContractActions(
            txStatus,
            contractAddress,
          );

          // If any actions match the contract, parse + store them
          for (const action of contractRelatedActions) {
            const parsedTx = this.parseTransaction(
              tx.hash,
              blockHeight,
              tx.signer_id,
              contractAddress,
              action,
              txStatus,
            );
            await this.saveTransaction(parsedTx);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error indexing blocks', error);
    }
  }

  private extractContractActions(txStatus: any, targetContract: string) {
    // Filter receipts for the target contract
    return txStatus.receipts_outcome
      .filter((o: any) => o.outcome.executor_id === targetContract)
      .map((o: any) => {
        // Extract method calls from logs or the outcome status
        // This code is highly dependent on the shape of NEAR transaction logs
        return {
          methodName: 'someMethod',
          args: {},
          amount: '0',
        };
      });
  }

  private parseTransaction(
    txHash: string,
    blockHeight: number,
    signerId: string,
    contractAddress: string,
    action: any,
    txStatus: any,
  ): Partial<Transaction> {
    return {
      txHash,
      blockHeight,
      timestamp: txStatus?.block_hash ? Date.now() : Date.now(), // or parse from NEAR block timestamp
      sender: signerId,
      receiver: contractAddress,
      contractAddress,
      methodName: action.methodName,
      args: action.args,
      amount: action.amount,
      actionType: action.methodName,
    };
  }

  private async saveTransaction(parsedTx: Partial<Transaction>) {
    // Avoid duplicates
    const exists = await this.transactionModel.findOne({
      txHash: parsedTx.txHash,
    });
    if (!exists) {
      await this.transactionModel.create(parsedTx);
      this.logger.log(`Transaction ${parsedTx.txHash} indexed successfully`);
    }
  }
}
