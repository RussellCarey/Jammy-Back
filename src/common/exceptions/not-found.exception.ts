import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList } from '../constants/exception-title-list.const';
import { StatusCodesList } from '../constants/status-code-list.const';

export class NotFoundException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.NotFound,
        code: code || StatusCodesList.NotFound,
        statusCode: HttpStatus.NOT_FOUND,
        error: true,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
