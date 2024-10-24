import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signUp(credentials, userDto) {
    const repeatedUser = await this.credentialRepository.findOne({
      where: { email: credentials.email },
    });
    if (repeatedUser) throw new BadRequestException('Email already exists');
    const user = await this.userRepository.createUser(userDto);
    if (!user) throw new Error('error');
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    credentials.password = hashedPassword;
    credentials.user = user;
    const credential = await this.credentialRepository.save(credentials);
    if (!credential) throw new Error('error');
    // return `Welcome ${user.name}`;
    await this.mailService.mailConfirm(credentials.email, 'SignUp');
    return user;
  }

  async logIn(loginUserDto: LogInDto) {
    const authUser = await this.credentialRepository.findOne({
      where: { email: loginUserDto.email },
      relations: ['user'],
    });
    if (!authUser) throw new UnauthorizedException('Invalid credentials');

    const validatePassword = await bcrypt.compare(
      loginUserDto.password,
      authUser.password,
    );
    if (!validatePassword)
      throw new UnauthorizedException('Invalid credentials');

    const payload = {
      id: authUser.credentials_id,
      email: authUser.email,
      isAdmin: authUser.user.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    const { isAdmin, ...userWithoutAdmin } = authUser.user;

    return {
      user: userWithoutAdmin,
      email: authUser.email,
      token,
    };
  }

  async requestResetPassword(email: string) {
    const user = await this.credentialRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetLink = `http://localhost:3000/auth/reset-password?email=${email}`;
    await this.mailService.resetPasswordEmail(user.email, resetLink);
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.credentialRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.credentialRepository.update(
      { email: user.email },
      { password: hashedPassword },
    );
  }

  async exchangeCodeForToken(code: string) {
    const url = `https://${process.env.AUTH0_BASE_URL}/oauth/token`;
    const response = await axios.post(url, {
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_SECRET,
      code,
      redirect_uri: `http://localhost:3000/auth/callback`,
    });

    return response.data.access_token;
  }

  async getUserInfoFromAuth0(accessToken: string) {
    const url = `https://${process.env.AUTH0_BASE_URL}/userinfo`;

    // Realiza la solicitud GET incluyendo el accessToken en las cabeceras
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Aquí pasas el accessToken
      },
    });

    const userData = response.data; // La respuesta contiene la información del usuario

    const user = await this.credentialRepository.findOne({
      where: { email: userData.email },
      relations: ['user'],
    });

    if (!user) {
      const data = {
        name: userData.name,
        phone: 'no-phone',
        address: 'no-address',
        user_img: userData.picture,
        provider: 'auth0',
      };
      const createUser = await this.userRepository.createAuth0User(data);

      const password =
        '$2b$10$eW/xx8ZyKh2vD2h74I8Jee8U.e8XxD3z0Cg8mB2NQ5b2FJChMijA6';

      await this.credentialRepository.save({
        email: userData.email,
        password,
        user: createUser,
        provider: 'auth0',
      });

      const payload = {
        user_id: createUser.user_id,
        name: userData.name,
        phone: 'no-phone',
        address: 'no-address',
        email: userData.email,
        user_img: userData.picture,
        isAdmin: createUser.isAdmin,
      };

      const token = this.jwtService.sign(payload);

      return token;
    }

    const payload = {
      user_id: user.user.user_id,
      name: userData.name,
      phone: 'no-phone',
      address: 'no-address',
      email: userData.email,
      user_img: userData.picture,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
