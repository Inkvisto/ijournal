import { PasswordService } from './services/password.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { AuthController } from 'src/auth/auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { JwtRefreshTokenStrategy } from '../strategies/jwt_refresh.strategy';
import { AuthResolver } from '../resolvers/auth.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers:[
    AuthController
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
    LocalStrategy,
    JwtRefreshTokenStrategy
  ],
  exports: [GqlAuthGuard,AuthService],
})
export class AuthModule {}
