import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { stat } from 'fs';
import { timestamp } from 'rxjs';
import { QueryFailedError } from 'typeorm';

// typeorm에서 쿼리를 날렸을 때 무제가 발생하면 애러를 반환한다.
// 쿼리 실행에 문제 있을 시 발생
@Catch(QueryFailedError)
export class QueryFailedExcaptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = 400; // 클라이언트에서 잘못된 값을 넣었기 때문에 400이라고 가정

    let message = '데이터베이스 에러 발생';

    if (exception.message.includes('duplicate key')) {
      message = '중복 키 에러 발생!';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
