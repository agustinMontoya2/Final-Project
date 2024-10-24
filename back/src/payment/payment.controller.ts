import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';


@Controller('payment')
export class PaymentController {

constructor(private readonly createOrderService: PaymentService) {
    
}

@Post('/createorder/:id') 
createOrderController(@Param('id') cart_id: string) {

return this.createOrderService.createOrderService(cart_id)

}

@Get('/success') 
succesController() {
    return 'succes'
}

@Get('/failure') 
failureController() {
    return 'failure'
}
@Get('/pendig') 
pendingController() {
return 'pending'
}

@Post('/webhook')
  async webhookController(@Body() body: any) {
    console.log('Webhook Body:', body); // imprimo el cuerpo

    // Verificar si el tipo es "payment"
    if (body.type === 'payment') {
      const paymentId = body.data.id; // obtengo el id de la transaccion
      console.log('Payment ID:', paymentId);

      try {
        // los detalles del pago utilizando el id
        const paymentDetails = await this.createOrderService.getPaymentDetails(paymentId);
        console.log('Payment Details:', paymentDetails);
        

      } catch (error) {
        console.error('Error fetching payment details:', error);
        return 'Error fetching payment details';
      }
    }

    return 'Webhook received';
  }

}


