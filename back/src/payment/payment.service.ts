import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { Cart } from 'src/products/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createOrderService(user_id: string) {
        // Busca el usuario y sus detalles del carrito
        const user = await this.userRepository.findOne({
            where: { user_id },
            relations: ['cart', 'cart.productDetail', 'cart.productDetail.product'],
        });

        if (!user) throw new NotFoundException("User not found");
        
        const cart = user.cart;
        if (!cart) throw new NotFoundException("Cart not found");
        
        const productDetails = cart.productDetail; 

        const client = new MercadoPagoConfig({
            accessToken: process.env.ACCES_TOKEN_PAYMENT,
        });

        const body = {
            items: productDetails.map(productDetail => ({
                id: productDetail.product.product_id,
                title: productDetail.product.product_name,
                quantity: Number(productDetail.quantity) || 1, 
                unit_price: Number(productDetail.product.price),
                currency_id: 'ARS',
            })),

            back_urls: {
                success: 'http://localhost:3000/payment/success',
                failure: 'http://localhost:3000/payment/failure',
                pending: 'http://localhost:3000/payment/pending',
            },

            notification_url: `${process.env.NGROK}/payment/webhook`,
             statement_descriptor: 'Fellini Bar'
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        console.log(result.init_point);
        return 'create order successfully'; 
    }

    async getPaymentDetails(paymentId: string) {
        try {
            const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.ACCES_TOKEN_PAYMENT}`, 
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching payment details:', error);
            throw new Error('Failed to fetch payment details');
        }
    }
}