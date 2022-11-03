import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.session.user)
      throw new UnauthorizedException({ message: 'You are not logged in' });
    return true;
  }
}
