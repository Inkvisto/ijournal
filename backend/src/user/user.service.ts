import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PasswordService } from '../auth/services/password.service';
import { ChangePasswordInput } from '../models/inputs/user-inputs/change-password.input';
import { UpdateUserInput } from '../models/inputs/user-inputs/update-user.input';
import { compare, hash } from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,

  ) {}


  async getAll(){
    return await this.prisma.user.findMany()
  }


  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({where:{email:email} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }



  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await hash(refreshToken, 10);
    await this.prisma.user.update({where:{id:userId},data:{
      refresh:currentHashedRefreshToken
    }});
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email:string) {
    const user = await this.getByEmail(email);;
 
 
    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.refresh
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }




}
