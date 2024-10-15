import { BadRequestException, Injectable } from '@nestjs/common';
import { LogInDto } from './dto/create-user.dto';
import { SignUpDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}
  async signUp(credentials, userDto) {
    const repeatedUser = await this.credentialRepository.findOne({
      where: { email: credentials.email },
    });
    if (repeatedUser) throw new BadRequestException('Email already exists');
    const user = await this.userRepository.createUser(userDto);
    if (!user) throw new Error('error');
    credentials.user = user;
    const credential = await this.credentialRepository.save(credentials);
    if (!credential) throw new Error('error');
    // return `Welcome ${user.name}`;
    return user;
  }
  async logIn(loginUserDto: LogInDto) {
    const { email, password } = loginUserDto;
    const user = await this.credentialRepository.findOne({ where: { email } });
    if (user && user.password === password) return user;
    throw new BadRequestException('Invalid credentials');
    // return this.credentialRepository()
  }
}
