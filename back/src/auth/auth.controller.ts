import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-user.dto';
import { LogInDto } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

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

  @Post('requestResetPassword')
  requestResetPassword(@Body('email') email: string) {
    this.authService.requestResetPassword(email);
    return { message: 'Password reset link sent to your email' };
  }

  @Post('resetPassword')
  resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ) {
    this.authService.resetPassword(email, newPassword);
    return { message: 'Password has been reset successfully' };
  }

  @Post('testEmail')
  async testEmail() {
    await this.mailService.resetPasswordEmail('chapa.fg@hotmail.com', 'prueba');
    return { message: 'Test email sent' };
  }
}
