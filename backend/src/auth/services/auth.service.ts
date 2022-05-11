import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
<<<<<<<< HEAD:src/auth/services/auth.service.ts
import { SignupInput } from '../../models/inputs/auth-inputs/signup.input';
import { Prisma, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { UserService } from '../../user/user.service';
import { Auth } from '../../models/auth.model';

========
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';
>>>>>>>> 7d9670b855cfe4c06a67beab30698f29fb923f17:src/auth/auth.service.ts

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly userService:UserService
  ) {}

  async createUser(payload: SignupInput): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      });
      
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(email: string, password: string):Promise<Auth> {
    try{
    const user = await this.prisma.user.findUnique({ where: { email:email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    
    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    


    return this.generateTokens({
      userId: user.id,
      email:user.email,
      password:user.password,
      username:user.username
    });
  } catch (error) {
    throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  }
  }

  
  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
  
      
      if (hashedPassword === user.password) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
      
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
  


  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token:{accessToken:string}):Promise<User> {
    const id = this.jwtService.decode(token.accessToken)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }


  generateTokens(payload:{email:string,password:string,userId:string,username:string}) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload:{email:string,password:string,userId:string,username:string} ){
  
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload,{
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const password = ''
      const email = ''
      const username = ''

      return this.generateTokens({
        userId,
        password,
        email,
        username
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  public logout(){
    return `accessToken=; HttpOnly; Path=/; Max-Age=0`;
  }
}
