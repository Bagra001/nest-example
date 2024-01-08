import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardService {
  private balance: number = 0.0;

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): number {
    return (this.balance += amount);
  }
}
