import {
  Controller,
  UseGuards,
  Body,
  Get,
  Session,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.services';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { UserUpdateDTO } from './users.update.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const users = await this.userService.getAll({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved all users', data: users };
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
    // TODO: Block account and delete later..
    const deletedUser = await this.userService.delete(session.user.id);
    return { status: HttpStatus.OK, data: deletedUser };
  }
}
