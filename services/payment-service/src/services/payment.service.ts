import { PaymentDto } from '../dto/payment.dto';
import { PaymentRepository } from '../repositories/payment.repository';

export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
  ) {}

  async createPayment(paymentData: PaymentDto) {

    console.log('Creating payment with data:', paymentData);


    return this.paymentRepository.createPayment({
      orderId: paymentData.orderId,
      userId: paymentData.userId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: 'PENDING',

      events: {
        create: {
            eventType: 'PAYMENT_CREATED',   
            payload: {
              orderId: paymentData.orderId,
              userId: paymentData.userId,
              amount: paymentData.amount,
              currency: paymentData.currency,
              status: 'PENDING',
            },
            processed: false,
            createdAt: new Date(),
        },
      },

    });

  }

  async processPayment(paymentData: { orderId: string }) {
    
    return this.paymentRepository.updatePaymentStatus({
      orderId: paymentData.orderId,
      status: 'COMPLETED',
    });
  }
}   