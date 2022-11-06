import {
  Controller,
  UseGuards,
  Request,
  Body,
  Get,
  Session,
  Patch,
  Delete,
  GoneException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.services';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { UserUpdateDTO } from './users.update.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @UseGuards(AdminGuard)
  @Get()
  async getProfile(@Request() req) {
    const users = await this.userService.find();
    return users;
  }

  @UseGuards(LoggedInGuard)
  @Patch()
  async updateUser(
    @Session() session: Record<string, any>,
    @Body() body: UserUpdateDTO,
  ) {
    const updatedUser = await this.userService.update(session.user.id, body);
    return { status: HttpStatus.OK, data: updatedUser };
  }

  @UseGuards(LoggedInGuard)
  @Delete()
  async deleteUser(@Session() session: Record<string, any>) {
    const deletedUser = await this.userService.delete(session.user.id);
    return { status: HttpStatus.OK, data: deletedUser };
  }
}
