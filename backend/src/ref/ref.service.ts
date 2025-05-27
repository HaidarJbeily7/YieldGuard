/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Pool, fetchAllPools } from '@ref-finance/ref-sdk';
import { Cache } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class RefService implements OnModuleInit {
  private readonly logger = new Logger(RefService.name);
  private readonly CACHE_KEY_POOLS = 'ref_pools';
  private readonly CACHE_TTL = 5 * 60; // 5 minutes

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    // Initial pool fetch when service starts
    await this.updatePoolsCache();
  }

  private async updatePoolsCache(): Promise<void> {
    try {
      const { ratedPools, unRatedPools, simplePools } = await fetchAllPools();
      const pools = [...ratedPools, ...unRatedPools, ...simplePools];
      await this.cacheManager.set(
        this.CACHE_KEY_POOLS,
        pools,
        this.CACHE_TTL * 1000,
      );
      this.logger.log(`Successfully cached ${pools.length} pools`);
    } catch (error) {
      this.logger.error('Failed to update pools cache', error);
      throw error;
    }
  }

  async getAllPools(): Promise<Pool[]> {
    try {
      const pools = await this.cacheManager.get<Pool[]>(this.CACHE_KEY_POOLS);

      if (!pools) {
        this.logger.log('Cache miss for pools, fetching from Ref Finance');
        await this.updatePoolsCache();
        return (
          (await this.cacheManager.get<Pool[]>(this.CACHE_KEY_POOLS)) || []
        );
      }

      return pools;
    } catch (error) {
      this.logger.error('Failed to get pools', error);
      throw error;
    }
  }

  async getPoolById(poolId: number): Promise<Pool | null> {
    const pools = await this.getAllPools();
    return pools.find((pool) => pool.id === poolId) || null;
  }
}
