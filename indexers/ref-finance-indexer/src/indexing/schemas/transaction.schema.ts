// src/indexing/schemas/transaction.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, unique: true })
  txHash: string;

  @Prop({ required: true })
  blockHeight: number;

  @Prop({ required: true })
  timestamp: number;

  @Prop()
  sender: string;

  @Prop()
  receiver: string;

  @Prop()
  contractAddress: string;

  @Prop()
  methodName: string;

  @Prop({ type: Object, default: {} })
  args: Record<string, any>;

  @Prop()
  amount: string;

  @Prop()
  actionType: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.index({ txHash: 1 }, { unique: true });
