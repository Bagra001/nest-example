import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { CreditCardService } from './creditcard/creditcard.service';
import { CurrentAccountService } from './current-account/current-account.service';
import { PaypalService } from './paypal/paypal.service';

describe('PaypalController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [CreditCardService, CurrentAccountService, PaypalService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
