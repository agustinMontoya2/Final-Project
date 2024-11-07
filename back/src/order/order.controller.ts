import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { Credential } from 'src/auth/entities/credential.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.create(createOrderDto);
    console.log('order created');
    return order;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.orderService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
