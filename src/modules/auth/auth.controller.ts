import {
  Controller,
  UseGuards,
  Session,
  Body,
  Post,
  HttpStatus,
  Get,
  Request,
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
    return HttpStatus.OK;
  }

  @Post('logout')
  async logout(@Request() req) {
    console.log(req.session);
    req.session.user = null;
    req.session.save();
    req.session.destroy();
    return HttpStatus.OK;
  }
}
