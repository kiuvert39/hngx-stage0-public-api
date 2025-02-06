import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class NumberClassificationService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async classifyNumber(number: number) {
    const cachedResult = await this.cacheManager.get(`number:${number}`);
    if (cachedResult) {
      return cachedResult; // Return cached response if exists
    }

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

    const result = {
      number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
    await this.cacheManager.set(`number:${number}`, result, 3600);
    return result;

  }

  private isPrime(number: number) {
    if (number < 2) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
    }
    return true;
  }

  private isPerfect(number: number) : boolean {
    if (number < 2) return false;
    let sum = 1;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) {
            sum += i;
            if (i !== number / i) sum += number / i;
        }
    }
    return sum === number;
  }

  private isArmstrong(number: number) {
    const absNum = Math.abs(number); // Handle negatives properly
    const digits = absNum.toString().split('');
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
    return sum === absNum;
  }

  private sumDigits(number: number) {
    const absNum = Math.abs(number); // Ensure negative numbers are handled correctly
    return absNum
      .toString()
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);
  }

  private async getFunFact(num: number): Promise<string> {
    try {

      const cachedFact = await this.cacheManager.get(`funfact:${num}`);
      if (cachedFact) return cachedFact as string;

      const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
      await this.cacheManager.set(`funfact:${num}`, response.data.text, 86400);
      return response.data.text;

    } catch (error) {
      return 'Fun fact not available at the moment.';
    }
  }


}
