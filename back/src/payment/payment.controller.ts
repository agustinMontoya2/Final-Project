import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly createOrderService: PaymentService) {}

  @Post('/createorder/:id')
  createOrderController(@Param('id') user_id: string) {
    return this.createOrderService.createOrderService(user_id);
  }

  @Post('/webhook')
  async webhookController(@Body() body: any) {
    console.log('Webhook Body:', body); // imprimo el cuerpo

    // Verificar si el tipo es "payment"
    if (body.type === 'payment') {
      const paymentId = body.data.id; // obtengo el id de la transaccion

      try {
        // los detalles del pago utilizando el id
        const paymentDetails =
          await this.createOrderService.getPaymentDetails(paymentId);
        return paymentDetails;
      } catch (error) {
        console.error('Error fetching payment details:', error);
        return 'Error fetching payment details';
      }
    } else {
      return 'Invalid webhook type';
    }
  }
}
