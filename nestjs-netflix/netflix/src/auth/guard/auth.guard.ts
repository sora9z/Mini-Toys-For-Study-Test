import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Public } from '../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // 요청에서 유저 객체가 존재하는지 확인한다.
    // 모든 로직을 bypass
    const isPublic = this.reflector.get(Public, context.getHandler()); // context.getHandler 에서 Public를 가져온다. Public decorator에 입력된 객체가 들어온다.
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest(); // 요청을 가져온다
    // 궁금한게 있음. 만약 grpc 소켓 등의 통신의 인증을 확인해야 하는 경우 지금처럼 미들웨어에서도 할 수 있는 것인가?
    if (!request.user || request.user.type !== 'access') {
      return false;
    }
    return true;
  }
}
