import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { envVariableKeys } from 'src/common/const/env.const';

// BarerToken middleware는 토큰을 분석해서 req.user를 만들어 주는 역할을 한다.
@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    /// Bearer $token
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      next();
      return;
    }

    try {
      const token = this.validateBearerToken(authHeader);

      const decodedPayload = this.jwtService.decode(token); // decode는 만룓가 되었는지 등의 검증은 안한다.
      const isRefreshToken = decodedPayload.type === 'refresh';

      if (
        decodedPayload.type !== 'refresh' &&
        decodedPayload.type !== 'access'
      ) {
        throw new UnauthorizedException('잘못된 토큰입니다.');
      }

      const secretKey = isRefreshToken
        ? this.configService.get<string>(envVariableKeys.refreshTokenSecret)
        : this.configService.get<string>(envVariableKeys.accessTokenSecret);
      // verify로 검증까지 한다
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secretKey,
      });
      req.user = payload;
      next();
    } catch (e) {
      // 권한이 없는 경우엔 알려주어야 한다
      if (e.name == 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료됐습니다.');
      }
      // public router에서 쓸대없이 토큰을 체크하고 애러를 던진다. 이는 가드에서 처리해도 됨. 그러면 public은 토큰 없어도 상관 없음
      // req.user는 undefined가 될거다
      next();
    }
  }

  validateBearerToken(rawToken: string) {
    const bearerSplit = rawToken.split(' ');

    if (bearerSplit.length !== 2) {
      throw new BadRequestException('토큰 포멧이 잘못되었습니다.');
    }
    const [bearer, token] = bearerSplit;

    if (bearer.toLocaleLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포멧이 잘못되었습니다.');
    }

    return token;
  }
}
