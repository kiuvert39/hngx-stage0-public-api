import { Module } from '@nestjs/common';
import { NumberClassificationController } from './app.controller';
import {  NumberClassificationService } from './app.service';

@Module({
  imports: [],
  controllers: [NumberClassificationController],
  providers: [ NumberClassificationService],
})
export class AppModule {}
