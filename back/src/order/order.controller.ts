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

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly mailService: MailService,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const userFind = await this.credentialRepository.findOne({
      where: { user: { user_id: createOrderDto.userId } },
    });

    const order = this.orderService.create(createOrderDto);

    await this.mailService.mailConfirm(userFind.email, 'Order');

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
