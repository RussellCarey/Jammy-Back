import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('all')
  async getProfile(@Request() req) {
    const users = await this.userService.find();
    return users;
  }
}
