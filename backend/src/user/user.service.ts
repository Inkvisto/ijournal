import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PasswordService } from '../auth/services/password.service';
import { ChangePasswordInput } from '../models/inputs/user-inputs/change-password.input';
import { UpdateUserInput } from '../models/inputs/user-inputs/update-user.input';
import { compare, hash } from 'bcrypt';
import { UserIdArgs } from 'src/models/args/user-id.args';
import { Prisma } from '@prisma/client';
import { UserModel } from 'src/models/user.model';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,

  ) {}


  async getAll(){
    return await this.prisma.user.findMany({
      select:{
        categories:true
      }
    })
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }



  async getById(id:string){
    return this.prisma.user.findUnique({where:{id:id}})
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({where:{email:email} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 

  updateUser(userId: string, newUserData: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async subscribeToCategory(userId: string, categoryId: string) {
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        categories: {
          connect: {
            id: categoryId
          }
        }
      },
      include: { categories: true }
    })
  }

  async unsubscribeToCategory(userId: string, categoryId: string) {
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        categories: {
          disconnect:{
            id:categoryId
          }
        }
      },
      include: { categories: true }
    })
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




}
