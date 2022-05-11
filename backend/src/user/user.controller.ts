
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
) {}
 @Get()
 async findAll(){
   return await this.userService.getAll()
 }
}






    