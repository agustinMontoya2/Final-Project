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
    console.log('creating user...');

    const user = await this.userRepository.create(signUpDto);
    const userCart = new Cart();
    const userFavorities = new Favorities();

    const savedCart = await this.cartRepository.save(userCart);
    const savedFavorities =
      await this.favoritiesRepository.save(userFavorities);

    user.cart = savedCart;
    user.favorities = savedFavorities;
    const savedUser = await this.userRepository.save(user);

    userCart.user = savedUser;
    userFavorities.user = savedUser;
    await this.cartRepository.save(userCart);
    await this.favoritiesRepository.save(userFavorities);

    const { cart, favorities, ...userWithoutRelations } = savedUser;
    return userWithoutRelations;
  }

  async updateUser(user_id: string, updateUserDto: any) {
    await this.userRepository.update(user_id, updateUserDto);
    const user = await this.getUserById(user_id);
    return user;
  }
}
