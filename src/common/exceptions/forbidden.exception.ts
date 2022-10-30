import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList } from '../constants/exception-title-list.const';
import { StatusCodesList } from '../constants/status-code-list.const';

export class ForbiddenException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.Forbidden,
        code: code || StatusCodesList.Forbidden,
        statusCode: HttpStatus.FORBIDDEN,
        error: true,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
