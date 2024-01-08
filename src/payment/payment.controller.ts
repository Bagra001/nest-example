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
      deposit: (amount) => this.paypalService.deposit(amount),
    },
    [PaymentType.CURRENT_ACCOUNT]: {
      deposit: (amount) => this.currentAccountService.deposit(amount),
    },
    [PaymentType.CREDIT_CARD]: {
      deposit: (amount) => this.creditCardService.deposit(amount),
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
  balance(): string {
    return `Balance: ${
      this.paypalService.getBalance() +
      this.currentAccountService.getBalance() +
      this.creditCardService.getBalance()
    } €`;
  }

  @Put('/deposit')
  deposit(@Body() payment: PaymentDto): void {
    this.paymentHandler[payment.paymentType]
      ? this.paymentHandler[payment.paymentType].deposit(payment.amount)
      : this.paymentHandler.default();
  }
}
