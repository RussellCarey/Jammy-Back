import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList } from '../constants/exception-title-list.const';
import { StatusCodesList } from '../constants/status-code-list.const';

export class UnauthorizedException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.Unauthorized,
        code: code || StatusCodesList.UnauthorizedAccess,
        statusCode: HttpStatus.UNAUTHORIZED,
        error: true,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
