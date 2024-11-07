import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { MailService } from 'src/mail/mail.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createOrderService: PaymentService,
    private readonly orderService: OrderService,
    private readonly mailService: MailService,
  ) {}

  @Post('/createorder/:id')
  createOrderController(
    @Param('id') user_id: string,
    @Body() createOrder: any,
  ) {
    return this.createOrderService.createOrderService(user_id, createOrder);
  }

  @Post('/webhook')
  async webhookController(@Body() body: any) {
    console.log('ESTE ES EL WEBHOOK');
    console.log(body);

    // Verificar si el tipo es "payment"
    if (body.type === 'payment') {
      const paymentId = body.data.id; // obtengo el id de la transaccion
      try {
        // los detalles del pago utilizando el id
        const paymentDetails =
          await this.createOrderService.getPaymentDetails(paymentId);
        console.log('PAYMENT CONTROLLER PAYMENTDETAILS', paymentDetails);

        if (paymentDetails.status === 'approved') {
          const order = await this.orderService.create(
            paymentDetails.metadata.create_order,
          );
        }
        console.log('verificando el status del pago', paymentDetails.status);

        if (
          paymentDetails.status === 'rejected' ||
          paymentDetails.status === 'cancelled'
        ) {
          console.log('pago cancelado', paymentDetails.metadata.email);

          await this.mailService.mailPaymentCancel(
            paymentDetails.metadata.email,
          );
        }
        return paymentDetails;
      } catch (error) {
        console.error('Error fetching payment details:', error);
        return 'Error fetching payment details';
      }
    } else {
      console.log('NO HAY NADA');

      return 'Invalid webhook type';
    }
  }
}
