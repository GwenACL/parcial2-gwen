/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BusinessError } from '../../errors/business-errors';

@Injectable()
export class BusinessErrorsInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
     return next.handle()
       .pipe(catchError(error => {
         if (error.type === BusinessError.NOT_FOUND)
             throw new HttpException(error.message, HttpStatus.NOT_FOUND);
         else if (error.type === BusinessError.NOT_EMPTY)
             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
         else if (error.type === BusinessError.EMPTY_SLOGAN)
             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
         else if (error.type === BusinessError.EMPTY_TITLE || error.type === BusinessError.INCORRECT_DATE || error.type === BusinessError.INCORRECT_SIZE || error.type === BusinessError.TOO_SHORT || error.type === BusinessError.WRONG_SIZE )
             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
         else
             throw error;
       }));
   }
}
/* archivo: src/shared/interceptors/business-errors.interceptor.ts */
