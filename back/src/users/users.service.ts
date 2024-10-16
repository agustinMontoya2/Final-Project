import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { productDetailDto } from 'src/products/dto/create-product.dto';

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

  async addToCart(productDetail: productDetailDto, user_id: string) {
    const user = await this.findOne(user_id);
    if (!user || !user.cart)
      throw new NotFoundException(`Cart not found for user with id ${user_id}`);
    return this.usersRepository.addToCart(productDetail, user.cart);
  }
}
