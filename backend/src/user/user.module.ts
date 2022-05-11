import { UserResolver } from '../resolvers/user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordService } from '../auth/services/password.service';
import { UserController } from 'src/user/user.controller';


@Module({
  imports: [],
  controllers:[UserController],
  providers: [UserResolver, UserService, PasswordService],
  exports:[UserService]
})
export class UserModule {}
