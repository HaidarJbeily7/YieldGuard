import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexingModule } from './indexing/indexing.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'), // e.g. mongodb://localhost:27017/yieldguard
      }),
      inject: [ConfigService],
    }),
    IndexingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
