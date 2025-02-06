import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NumberClassificationService {
  async classifyNumber(number: number) {
    const isPrime = this.isPrime(number);
    const isPerfect = this.isPerfect(number);
    const isArmstrong = this.isArmstrong(number);
    const isOdd = number % 2 !== 0;
    const digitSum = this.sumDigits(number);
    const funFact = await this.getFunFact(number);

    // Determine properties
    const properties: string[] = [];
    if (isArmstrong) properties.push('armstrong');
    properties.push(isOdd ? 'odd' : 'even');

    return {
      number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
  }

  private isPrime(number: number) {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
    }
    return true;
  }

  private isPerfect(number: number) {
    if (number < 1) return false;

    let sum = 0;
    for (let i = 1; i < number; i++) {
      if (number % i === 0) sum += i;
    }
    return sum === number;
  }

  private isArmstrong(number: number) {
    const digits = number.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + digit ** power, 0);
    return sum === number;
  }

  private sumDigits(number: number) {
    return number
      .toString()
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }

  private async getFunFact(num: number): Promise<string> {
    try {
      const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
      return response.data.text;
    } catch (error) {
      return 'Fun fact not available at the moment.';
    }
  }


}
