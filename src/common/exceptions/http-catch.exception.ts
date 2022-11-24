import 'dotenv/config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { configService } from 'src/config/config.service';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }

  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // Parse message from validations if there.
    const excepptionStrigified = JSON.stringify(exception);
    const validationData = JSON.parse(excepptionStrigified);

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message || exception.message
        : 'Internal server error';

    const devErrorResponse: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: exception?.message,
      validation: validationData.response.message,
    };

    const prodErrorResponse: any = {
      statusCode,
      message,
    };

    const errorResponse = configService.isProduction()
      ? prodErrorResponse
      : devErrorResponse;

    this.logger.log(
      `request method: ${request.method}.. request url${request.url}`,
      JSON.stringify(errorResponse),
    );

    response.status(statusCode).json(errorResponse);
  }
}
