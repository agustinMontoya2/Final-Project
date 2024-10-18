import {
  Controller,
  Post,
  Body,
  
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-user.dto';
import { LogInDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAuthDto: SignUpDto) {
    const { email, password, name, address, phone } = createAuthDto;

    return this.authService.signUp(
      { email, password },
      { name, address, phone },
    );
  }

  @Post('login')
  lognIn(@Body() loginUserDto: LogInDto) {
    return this.authService.logIn(loginUserDto);
  }
}
