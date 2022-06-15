import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { validateInput } from 'src/models/inputs/validate-info.input';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: (req:Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['accessToken'];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload:validateInput){      
    return this.authService.validateUser(payload.userId)

  }
}
