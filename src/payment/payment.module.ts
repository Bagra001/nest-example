import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { CreditCardService } from './creditcard/creditcard.service';
import { CurrentAccountService } from './current-account/current-account.service';
import { PaypalService } from './paypal/paypal.service';
import { AccountService } from './service/account.service';

@Module({
  controllers: [PaymentController],
  providers: [
    CreditCardService,
    CurrentAccountService,
    PaypalService,
    AccountService,
  ],
})
export class PaymentModule {}
