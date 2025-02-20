import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { stat } from 'fs';
import { timestamp } from 'rxjs';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  // ArgumentsHost 는 execution context의 부모이다
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();

    console.log(`[UnauthorizedException] ${request.method} ${request.path}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '권한이 없습니다!',
    });
  }
}
