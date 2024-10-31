import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { productDetailDto } from 'src/products/dto/create-product.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findAll() {
    return await this.usersRepository.getUsers();
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, address, phone } = updateUserDto;
    if (!name && !email && !address && !phone)
      throw new BadRequestException('Cannot update user');
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserFavoritiesService(user_id: string) {
    const user = await this.findOne(user_id);

    if (!user) throw new NotFoundException('user not found');

    return this.usersRepository.getUserFavoritiesRepository(user);
  }

  async getCart(user_id) {
    const user = await this.findOne(user_id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.getCart(user);
  }
  async addToCart(productDetailDto: productDetailDto, user_id: string) {
    console.log('service');
    const quantity = productDetailDto.quantity ?? 1;

    const productDetail = { ...productDetailDto, quantity };

    console.log(productDetail, user_id);

    const user = await this.usersRepository.getUserById(user_id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.addToCart(productDetail, user);
  }

  async addToFavoritiesService(product_id: string, user_id: string) {
    if (!isUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    const user = await this.findOne(user_id);

    return this.usersRepository.addToFavoritiesRepository(product_id, user);
  }

  async removeCartService(product_detail_id: string) {
    if (!isUUID(product_detail_id))
      throw new BadRequestException('Product Detail ID not valid');
    return this.usersRepository.removeOneQuantityCart(product_detail_id);
  }

  async removeOneProductCartService(product_detail_id: string) {
    if (!isUUID(product_detail_id))
      throw new BadRequestException('Product Detail ID not valid');
    return this.usersRepository.removeOneProductCart(product_detail_id);
  }

  async removeAllCartService(user_id: string) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');
    const user = await this.findOne(user_id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.removeAllCart(user);
  }

  async removeFavoritiesService(product_id: string, user_id: string) {
    if (!isUUID(product_id))
      throw new BadRequestException('Product ID not valid');
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');
    const user = await this.findOne(user_id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.removeFavorities(product_id, user);
  }

  async banUser(user_id: string) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');
    const user = await this.findOne(user_id);
    return this.usersRepository.banUser(user);
  }

  async adminUser(user_id: string) {
    if (!isUUID(user_id)) throw new BadRequestException('User ID not valid');
    const user = await this.findOne(user_id);
    return this.usersRepository.adminUser(user);
  }

  async getEmailByUser(user_id: string) {
    return this.usersRepository.getEmailByUser(user_id);
  }
}
