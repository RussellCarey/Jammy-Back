import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: any) {
    const foundUser = await this.usersService.findOne(body.email);
    if (!foundUser)
      throw new NotFoundException({ message: 'Cannt find this user' });

    const isMatch = await bcrypt.compare(body.password, foundUser.password);

    if (!isMatch)
      throw new UnauthorizedException({ message: 'Incorrect password' });

    const payload = { email: body.email };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async register(body) {
    const userExists = await this.usersService.findOne(body.email);
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
