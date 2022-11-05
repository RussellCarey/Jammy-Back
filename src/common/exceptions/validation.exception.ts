import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

interface Error {
  error: string;
  message: string;
}

class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super();
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();

    return response.status(400).json({
      statusCode: 400,
      createdBy: 'MOOBLY',
      validationErrors: exception.validationErrors,
    });
  }
}
