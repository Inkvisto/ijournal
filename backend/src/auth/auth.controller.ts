import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Post, Req, Res, SerializeOptions, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "@prisma/client";
import { Response } from "express";
import RequestWithUser from "src/models/interfaces/requestWithUser.interface";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import LocalAuthGuard from "src/guards/local-auth.quard";
import RoleGuard from "src/guards/roles.quard";
import { Role, UserModel } from "src/models/user.model";
import { LoginInput } from "src/models/inputs/auth-inputs/login.input";
import { SignupInput } from "src/models/inputs/auth-inputs/signup.input";
import { UserModule } from "src/user/user.module";
import { AuthService } from "src/auth/services/auth.service";
import { UserService } from "src/user/user.service";
import JwtRefreshGuard from "../guards/refresh-auth.guard";
import { UserEntity } from "src/decorators/user.decorator";
import { UserInput } from "src/models/inputs/user-inputs/user.input";


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
    export class AuthController{
        constructor(
          private readonly authService:AuthService,
          private readonly userService:UserService
          ) {}

 
        @Post('register')
        register(@Body() reg: SignupInput){
          return this.authService.createUser(reg)
        }
        @UseGuards(LocalAuthGuard)
        @Post('login')
        
         async login(@UserEntity() user:UserModel,@Body() userPayload:UserInput,@Res({ passthrough: true }) response:Response) {
         
          const cookies = await this.authService.login(
            userPayload.email,userPayload.password
          )

          await this.authService.setCurrentRefreshToken(cookies.refreshToken,user.id);
            console.log(await this.userService.user({id:user.id}))

          response
          .cookie('accessToken',cookies.accessToken,{
            httpOnly:true,
            domain:'localhost',
            expires:new Date(Date.now()+1000 * 60 * 15)
          })

          response
          .cookie('refreshToken',cookies.refreshToken,{
            httpOnly:true,
            domain:'localhost',
            expires:new Date(Date.now()+1000*60*60*24*15)
          })
    
        
        
          return new UserModel(user)

        }

      @UseGuards(JwtRefreshGuard)
        @Get('/refresh')
        refresh(@UserEntity() user:UserModel, @Res({ passthrough: true }) response:Response ){

        
       const accessToken = this.authService.generateAccessToken({ userId: user.id })
       
        response
        .cookie('accessToken',accessToken ,{
          httpOnly:true,
          domain:'localhost',
          expires:new Date(Date.now()+1000 * 60 * 15)
        })

        return new UserModel(user)
      }


        
        @Post('/user')
        async getUserFromToken(@Body() tokens:{accessToken:string},@Req() request){
         try{
          const data = await this.authService.getUserFromToken(tokens)
          return new UserModel(data)
         }catch(err){
           throw new NotFoundException()
         }
        }


        @HttpCode(200)
        @UseGuards(JwtAuthGuard)
        @Post('/logout')
        async logout(@UserEntity() user: UserModel, @Res() response: Response) {
          await this.authService.removeRefreshToken(user.id)
          response.setHeader('Set-Cookie', this.authService.logout());
          response.end()
        }
      
        
    }