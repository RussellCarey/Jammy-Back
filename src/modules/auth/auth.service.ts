import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.services';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
}
