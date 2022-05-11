import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Post, Req, Res, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
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
        
         async login(@Body() user:User,@Req() request:RequestWithUser,@Res({ passthrough: true }) response) {
         
          const cookies = await this.authService.login(
           user.email,user.password
          )

          response
          .cookie('accessToken',cookies.accessToken,{
            httpOnly:true,
            domain:'localhost',
            expires:new Date(Date.now()+1000*60*60*24)
          })
        
  
          
          await this.userService.setCurrentRefreshToken(cookies.refreshToken, request.user.id);
  
       
          return new UserModel(request.user,cookies)

        }

      @UseGuards(JwtRefreshGuard)
        @Get('/refresh')
        refresh(@Req() request,@Res({ passthrough: true }) response) {
        
         
       const accessTokenCookie = this.authService.refreshToken(request.cookies.refreshToken)
  
     
        
        response
        .cookie('accessToken',accessTokenCookie.accessToken,{
          httpOnly:true,
          domain:'localhost',
          expires:new Date(Date.now()+1000*60*60*24)
        })

        return request.user;
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
        async logout(@Req() request: RequestWithUser, @Res() response: Response) {
          request.res.setHeader('Set-Cookie', this.authService.logout());
          response.end()
         
        }
      
        
    }