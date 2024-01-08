import { PaymentType } from './paymenttype';

export interface PaymentDto {
  readonly paymentType: PaymentType;
  readonly amount: number;
}
