import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, context) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    if (err || !user) {
      if (!email) {
        throw new HttpException(
          { message: 'Please include an email' },
          HttpStatus.OK,
        );
      } else if (!password) {
        throw new HttpException(
          { message: 'PLease include a password' },
          HttpStatus.OK,
        );
      } else {
        throw err || new UnauthorizedException();
      }
    }
    return user;
  }
}
