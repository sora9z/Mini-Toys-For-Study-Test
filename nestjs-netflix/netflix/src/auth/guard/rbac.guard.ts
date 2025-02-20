import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC } from '../decorator/rbac.decorator';
import { Role } from 'src/user/entity/user.entity';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(RBAC, context.getHandler());

    // Role Enum에 해당되는 값이 데코레이터에 들어갔는지 확인하기!
    if (!Object.values(Role).includes(role)) {
      return true;
    }

    // user 객체의 role이 메서드에서 요구하는 role이 있는지 확인
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    // auth guard가 통과했는지를 check
    if (!user) {
      return false;
    }

    // role enum은 0,1,2 로 작을수록 권한이 높음
    return user.role <= role;
  }
}
