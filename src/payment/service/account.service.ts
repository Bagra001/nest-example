import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';

@Injectable()
export class AccountService {
  getAccount(account: string, accounts: AccountDto[]): AccountDto {
    const foundAccount = accounts.find(
      (accountDto) => accountDto.account == account,
    );
    if (!foundAccount) {
      throw new BadRequestException(
        'Something went wrong by finding your account',
      );
    }
    return foundAccount;
  }
}
