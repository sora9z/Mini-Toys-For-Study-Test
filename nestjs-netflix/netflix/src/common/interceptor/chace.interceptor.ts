import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 고도화를 한다면, 1초 이전의 비슷한 요청의 경우 그대로 인터셉터에서 반환하도록 할 수 있다.
    const request = context.switchToHttp().getRequest();

    ('GET /movie');
    const key = `${request.method}-${request.path}`;

    if (this.cache.has(key)) {
      // Observable로 반환하려면 of를 사용하면 된다
      return of(this.cache.get(key));
    }

    return next.handle().pipe(tap((response) => this.cache.set(key, response)));
  }
}
