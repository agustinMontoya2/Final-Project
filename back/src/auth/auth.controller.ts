import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-user.dto';
import { LogInDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
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

  //auth0 rutas de login y logout
  @Get('login')
  login(@Res() res: Response) {
    const redirectUri = 'http://localhost:3000/auth/callback';
    const domain = process.env.AUTH0_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const url = `https://${domain}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=openid profile email`;
    console.log(url);
    res.redirect(url);
  }

  @Get('callback')
  async handleAuthCallback(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      return res.status(400).json({ error: 'No code received' });
    }

    const token_auth0 = await this.authService.exchangeCodeForToken(code);

    const token = await this.authService.getUserInfoFromAuth0(token_auth0);

    if (token) {
      const frontendUrl = `http://localhost:4000/auth0?token_auth0=${token}`;
      return res.redirect(frontendUrl);
    } else {
      return res.status(500).json({ error: 'Failed to get token' });
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.oidc.logout({ returnTo: 'http://localhost:4000' });
  }
}
