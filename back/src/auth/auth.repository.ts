import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthRepository {
  constructor(private readonly usersRepository: UsersRepository) {}
}
