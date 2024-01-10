import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
} from '@nestjs/common';
import { CreditCardService } from './creditcard/creditcard.service';
import { CurrentAccountService } from './current-account/current-account.service';
import { PaypalService } from './paypal/paypal.service';
import { PaymentDto } from './dto/payment.dto';
import { PaymentType } from './dto/paymenttype';

@Controller('payment')
export class PaymentController {
  paymentHandler = {
    [PaymentType.PAYPAL]: {
      deposit: (amount: number, account: string) =>
        this.paypalService.deposit(amount, account),
    },
    [PaymentType.CURRENT_ACCOUNT]: {
      deposit: (amount: number, account: string) =>
        this.currentAccountService.deposit(amount, account),
    },
    [PaymentType.CREDIT_CARD]: {
      deposit: (amount: number, account: string) =>
        this.creditCardService.deposit(amount, account),
    },
    default: () => {
      throw new BadRequestException('Invalid payment-type');
    },
  } as const;

  constructor(
    private paypalService: PaypalService,
    private currentAccountService: CurrentAccountService,
    private creditCardService: CreditCardService,
  ) {}

  @Get('/balance')
  balance(account: string): string {
    return `Balance: ${
      this.paypalService.getBalance(account) +
      this.currentAccountService.getBalance(account) +
      this.creditCardService.getBalance(account)
    } €`;
  }

  @Put('/deposit')
  deposit(@Body() payment: PaymentDto): void {
    this.paymentHandler[payment.paymentType]
      ? this.paymentHandler[payment.paymentType].deposit(
          payment.amount,
          payment.account,
        )
      : this.paymentHandler.default();
  }
}
