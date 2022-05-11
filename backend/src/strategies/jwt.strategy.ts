import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
<<<<<<<< HEAD:src/strategies/jwt.strategy.ts
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { User } from '@prisma/client';
========
import { Injectable, UnauthorizedException } from '@nestjs/common';
>>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/auth/jwt.strategy.ts
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
     
        return request?.cookies?.accessToken;
      }]),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

   async validate(payload:any) {

    return { userId: payload.userId,username:payload.username };
  }
}
