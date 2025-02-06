import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { NumberClassificationService } from './app.service';

@Controller('api')
export class NumberClassificationController {
  
  constructor(private readonly numberService: NumberClassificationService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') num: string) {
    const number = parseInt(num, 10);
    if (isNaN(number)) {
      throw new BadRequestException({ number: num, error: true });
    }
    return await this.numberService.classifyNumber(number);
  }
}
