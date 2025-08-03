import { HttpStatus } from '@nestjs/common';

export interface SuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error?: string;
  details?: any;
}

export class ResponseHelper {
  static success<T>(
    message: string,
    data?: T,
    statusCode: number = HttpStatus.OK,
  ): SuccessResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      ...(data && { data }),
    };
  }

  static error(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    error?: string,
    details?: any,
  ): ErrorResponse {
    return {
      success: false,
      statusCode,
      message,
      ...(error && { error }),
      ...(details && { details }),
    };
  }

  static notFound(message: string): ErrorResponse {
    return this.error(message, HttpStatus.NOT_FOUND, 'Not Found');
  }

  static badRequest(message: string, details?: any): ErrorResponse {
    return this.error(message, HttpStatus.BAD_REQUEST, 'Bad Request', details);
  }

  static unauthorized(message: string = 'Unauthorized'): ErrorResponse {
    return this.error(message, HttpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  static forbidden(message: string = 'Forbidden'): ErrorResponse {
    return this.error(message, HttpStatus.FORBIDDEN, 'Forbidden');
  }

  static internalError(
    message: string = 'Internal Server Error',
  ): ErrorResponse {
    return this.error(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
    );
  }
}

export const ApiResponse = {
  success: ResponseHelper.success,
  error: ResponseHelper.error,
  notFound: ResponseHelper.notFound,
  badRequest: ResponseHelper.badRequest,
  unauthorized: ResponseHelper.unauthorized,
  forbidden: ResponseHelper.forbidden,
  internalError: ResponseHelper.internalError,
};

export default ResponseHelper;
