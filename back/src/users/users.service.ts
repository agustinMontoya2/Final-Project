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
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserFavoritiesService(user_id: string) {
    const user = await this.findOne(user_id);

    if (!user) throw new NotFoundException('user');

    return this.usersRepository.getUserFavoritiesRepository(user);
  }

  async getCart(user_id) {
    const user = await this.findOne(user_id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.getCart(user);
  }
  async addToCart(productDetail: productDetailDto, user_id: string) {
    console.log('service');

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
}
