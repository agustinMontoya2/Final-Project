import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('favorities/:id')
  getUserFavorities(@Param('id') user_id: string) {
    return this.usersService.getUserFavoritiesService(user_id);
  }

  @Delete('favorities/:id')
  removeFavorities(
    @Param('id') user_id: string,
    @Body('product_id') product_id: string,
  ) {
    return this.usersService.removeFavoritiesService(product_id, user_id);
  }

  @Get('cart/:id')
  getCart(@Param('id') user_id: string) {
    return this.usersService.getCart(user_id);
  }

  @Delete('cart/:id')
  removeCart(@Param('id') product_detail_id: string) {
    return this.usersService.removeCartService(product_detail_id);
  }

  @Delete('cart/product/:id')
  removeOneProductCart(@Param('id') product_detail_id: string) {
    return this.usersService.removeOneProductCartService(product_detail_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('cart/:id')
  addToCart(
    @Body() productDetailDto: productDetailDto,
    @Param('id') user_id: string,
  ) {
    return this.usersService.addToCart(productDetailDto, user_id);
  }

  @Post('favorities/:id')
  addToFavoritiesController(
    @Body('product_id') product_id: string,
    @Param('id') user_id: string,
  ) {
    console.log(product_id, user_id);

    return this.usersService.addToFavoritiesService(product_id, user_id);
  }

  @Post('ban/:id')
  async banUser(@Param('id') user_id: string, @Body('reason') reason: string) {
    const user = await this.usersService.getEmailByUser(user_id);
    await this.mailService.mailBanUser(reason, user);
    return this.usersService.banUser(user_id);
  }

  @Post('admin/:id')
  adminUser(@Param('id') user_id: string) {
    return this.usersService.adminUser(user_id);
  }
}
