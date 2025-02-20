// email password로 인증하는 전략

import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

export class LocalAuthGuard extends AuthGuard('sorafactory') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'sorafactory') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    }); // 꼭 불러주어야함
  }

  /**
   * header가 아닌 body에 email,password를 넣어주어야 한다
   * validate함수는 Strategy에서 제공해주는 값으로 실제로 존재하는 사용자인지 검증을 해주어야 한다
   * LocalStrategy
   *
   * validate : username,password 를 넣어준다.(이미 그렇게 되어있다)
   * return -> Request(); 반환값은 Request 객체에서 받을 수 있다.
   */
  async validate(email: string, password: string) {
    const user = await this.authService.authenticate(email, password);

    return user;
  }
}
