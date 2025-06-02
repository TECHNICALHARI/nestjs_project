import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let error = 'Error';
    if (
      exception instanceof PrismaClientKnownRequestError &&
      exception.code === 'P2002'
    ) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Duplicate entry';
      const target = exception.meta?.target as string[] | undefined;
      message = target
        ? `${target.join(', ')} already exists`
        : 'Duplicate value';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      error = exception.name;
      const res = exception.getResponse();
      if (typeof res === 'object' && res && 'message' in res) {
        const msg = (res as any).message;
        message = Array.isArray(msg) ? msg.join(', ') : msg;
      } else {
        message = res as string;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      error = 'Internal Server Error';
      message = 'An unexpected error occurred';
    }

    response.status(status).json({
      success: false,
      status,
      data: null,
      error,
      message,
    });
  }
}
