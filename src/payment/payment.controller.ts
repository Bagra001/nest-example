import { Controller, Get } from '@nestjs/common';
import { CreditCardService } from './creditcard/creditcard.service';
import { CurrentAccountService } from './current-account/current-account.service';
import { PaypalService } from './paypal/paypal.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private paypalService: PaypalService,
    private currentAccountService: CurrentAccountService,
    private creditcardService: CreditCardService,
  ) {}

  @Get('/balance')
  balance(): string {
  return "your Balance is: 0,00 €";
  }
}
