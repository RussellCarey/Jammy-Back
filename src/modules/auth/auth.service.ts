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

  //TODO: CHECK WHAT THIS IS AVOUT
  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    return user;
  }

  async login(body: any) {
    const foundUser = await this.usersService.findOneByEmail(body.email);

    if (!foundUser || !body.email)
      throw new NotFoundException({ message: 'Cannot find this user' });

    const isMatch = await bcrypt.compare(body.password, foundUser.password);

    if (!isMatch)
      throw new UnauthorizedException({ message: 'Incorrect password' });

    return {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
  }

  async register(body) {
    const userExists = await this.usersService.findOneByEmail(body.email);

    if (userExists)
      throw new ConflictException({ message: 'Email already taken' });

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Save data into the DB
    this.usersService.save({ ...body, password: hashedPassword });

    return {
      ...body,
      password: null,
    };
  }
}
