import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrentAccountService {
  private balance: number = 0.0;

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }
}
