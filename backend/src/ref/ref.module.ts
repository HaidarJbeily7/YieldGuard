/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RefController } from './ref.controller';
import { RefService } from './ref.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [RefController],
  providers: [RefService],
  exports: [RefService],
})
export class RefModule {}
