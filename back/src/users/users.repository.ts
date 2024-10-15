import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/create-user.dto';
import { Cart } from 'src/products/entities/cart.entity';
import { Favorities } from 'src/products/entities/favorities.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Favorities)
    private favoritiesRepository: Repository<Favorities>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserById(user_id: string) {
    return await this.userRepository.findOne({
      where: { user_id },
    });
  }

  async createUser(signUpDto: SignUpDto) {
    const user = await this.userRepository.create(signUpDto);
    const cart = new Cart();
    const favorities = new Favorities();
    user.cart = cart;
    user.favorities = favorities;
    const savedUser = await this.userRepository.save(user);
    cart.user = savedUser;
    favorities.user = savedUser;
    await this.cartRepository.save(cart);
    await this.favoritiesRepository.save(favorities);
    return user.user_id;
  }

  async updateUser(user_id: string, updateUserDto: any) {
    await this.userRepository.update(user_id, updateUserDto);
    const user = await this.getUserById(user_id);
    return user;
  }
}
