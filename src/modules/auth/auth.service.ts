import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async delete(body: any) {
    const foundUser = await this.usersService.findOneByEmail(body.email);

    if (!foundUser || !body.email)
      throw new NotFoundException({ message: 'Cannot find this user' });

    this.usersService.delete(foundUser.id);

    return { message: 'Delete user', data: foundUser.id };
  }

  async update(body: any) {
    const foundUser = await this.usersService.findOneByEmail(body.email);

    if (!foundUser || !body.email)
      throw new NotFoundException({ message: 'Cannot find this user' });

    // const isMatch = await bcrypt.compare(body.password, foundUser.password);

    // if (!isMatch)
    //   throw new UnauthorizedException({ message: 'Incorrect password' });

    return {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
  }
}
