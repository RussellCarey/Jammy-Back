import {
  Controller,
  UseGuards,
  Request,
  Body,
  Get,
  Session,
  Patch,
  Delete,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.services';
import { UserGuard } from 'src/common/guards/user.guard';
import { UserUpdateDTO } from './users.update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('all')
  async getProfile(@Request() req) {
    const users = await this.userService.find();
    return users;
  }

  @UseGuards(UserGuard)
  @Patch('update')
  async updateUser(
    @Session() session: Record<string, any>,
    @Body() body: UserUpdateDTO,
  ) {
    const updatedUser = await this.userService.update(session.user.id, body);
    return HttpStatus.OK;
  }

  @UseGuards(UserGuard)
  @Delete('delete')
  async deleteUser(@Session() session: Record<string, any>) {
    return HttpStatus.OK;
  }
}
