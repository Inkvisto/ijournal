import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { UserIdArgs } from '../models/args/user-id.args';
import { UserModel } from '../models/user.model';

 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
        return request?.cookies?.refreshToken;
      }]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
 
  async validate(request: Request, payload: UserModel) {
    const refreshToken = request.cookies?.refreshToken;

   
    
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.email);
    
  }
}