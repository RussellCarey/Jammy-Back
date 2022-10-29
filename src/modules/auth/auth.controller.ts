import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { UserGuard } from './guards/user.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const registeredUser = this.authService.register(body);
    return registeredUser;
  }

  @Post('login')
  async login(@Body() body) {
    const loginAttempt = await this.authService.login(body);
    return loginAttempt;
  }

  //
  @UseGuards(JwtAuthGuard, UserGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Can get user from REQ using the
    return req.user;
  }
}
