import { Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { AccountService } from '../service/account.service';

@Injectable()
export class PaypalService {
  private paypalAccounts: AccountDto[];

  constructor(private accountService: AccountService) {}

  getBalance(account: string): number {
    return this.accountService.getAccount(account, this.paypalAccounts).balance;
  }

  deposit(amount: number, account: string): number {
    const depositAccount = this.accountService.getAccount(
      account,
      this.paypalAccounts,
    );
    depositAccount.balance += amount;
    return depositAccount.balance;
  }
}
