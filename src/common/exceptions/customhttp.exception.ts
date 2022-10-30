import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList } from '../constants/exception-title-list.const';
import { StatusCodesList } from '../constants/status-code-list.const';

export class CustomHttpException extends HttpException {
  constructor(message?: string, statusCode?: number, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.BadRequest,
        code: code || StatusCodesList.BadRequest,
        statusCode: statusCode || HttpStatus.BAD_REQUEST,
        error: true,
      },
      statusCode || HttpStatus.BAD_REQUEST,
    );
  }
}
