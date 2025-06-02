import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const isObject = typeof data === 'object' && data !== null;

        return {
          success: true,
          status: context.switchToHttp().getResponse().statusCode,
          data: isObject && 'data' in data ? data.data : data,
          message:
            isObject && 'message' in data
              ? data.message
              : typeof data === 'string'
              ? data
              : 'Request successful',
        };
      }),
    );
  }
}
