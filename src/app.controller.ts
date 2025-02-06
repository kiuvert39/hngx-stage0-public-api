import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { NumberClassificationService } from './app.service';

@Controller('api')
export class NumberClassificationController {
  
  constructor(private readonly numberService: NumberClassificationService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') num: string) {

    if (!/^-?\d+$/.test(num)) {
      // The entire string must consist solely of an optional '-' and digits
      throw new BadRequestException({ error: true, number: num });
    }
    const number = parseInt(num, 10);
    if (isNaN(number)) {
      throw new BadRequestException({ error: true, number: num  });
    }
    return await this.numberService.classifyNumber(number);
  }
}
