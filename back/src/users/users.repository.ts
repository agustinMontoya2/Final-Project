import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    const user = await this.userRepository.save(signUpDto);
    return user.user_id;
  }

  async updateUser(user_id: string, updateUserDto: any) {
    await this.userRepository.update(user_id, updateUserDto);
    const user = await this.getUserById(user_id);
    return user;
  }
}
