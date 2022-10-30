import {
  Controller,
  UseGuards,
  Session,
  Body,
  Post,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../common/guards/local.auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const registeredUser = this.authService.register(body);
    return registeredUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Session() session: Record<string, any>, @Body() body) {
    const loginUserAttempt = await this.authService.login(body);
    session.user = loginUserAttempt;
    console.log(session);
    return HttpStatus.OK;
  }

  @Get('check')
  async check(@Session() session: Record<string, any>) {
    console.log(session);
    return session;
  }

  @Post('logout')
  async logout(@Session() session: Record<string, any>, @Body() body) {
    console.log(session);
    console.log(session.id);
    console.log(session.user);
    const loginAttempt = await this.authService.logout(body);
    return { test: 'TEST' };
  }
}
