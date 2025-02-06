import { Module } from '@nestjs/common';
import { NumberClassificationController } from './app.controller';
import {  NumberClassificationService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [ CacheModule.register({
    store: redisStore,
    url: process.env.REDIS_URL, // Use Upstash Redis URL from .env
    ttl: 3600, // Cache for 1 hour
  }),],
  controllers: [NumberClassificationController],
  providers: [ NumberClassificationService],
})
export class AppModule {}
