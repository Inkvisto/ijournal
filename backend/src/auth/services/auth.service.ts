import { PrismaService } from 'nestjs-prisma';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from '../../models/inputs/auth-inputs/signup.input';
import { Prisma, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { UserService } from '../../user/user.service';
import { Auth } from '../../models/auth.model';
import * as bcrypt from 'bcrypt';

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
      
      console.log(e);
      
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


  generateTokens(payload: { userId: string }) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

   generateAccessToken(payload:{userId:string} ){
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

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const refresh = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateUser(userId, {
      refresh
    });
  }


  async getUserIfRefreshTokenMatches(refreshToken: string, id: Prisma.UserWhereUniqueInput) {
    const user = await this.userService.user(id)
 
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh
    );
 
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userService.updateUser(userId,{refresh:null});
  }

  public logout(){
    return [`accessToken=; HttpOnly; Path=/; Max-Age=0`,
    'refreshToken=; HttpOnly; Path=/; Max-Age=0']
  }
}
