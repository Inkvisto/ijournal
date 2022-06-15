import { Auth } from '../models/auth.model';
import { Token } from '../models/token.model';
import { LoginInput } from '../models/inputs/auth-inputs/login.input';
import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from '../auth/services/auth.service';
import { SignupInput } from '../models/inputs/auth-inputs/signup.input';
import { RefreshTokenInput } from '../models/inputs/auth-inputs/refresh-token.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    const user = await this.auth.createUser(data);
    return {
     user
    };
  }

  

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const user = await this.auth.login(
      email.toLowerCase(),
      password
    );

    return user
  }


  @Mutation(() => Auth)
  async getAuthenticatedUser(@Args('data') email:string,hashedPassword:string){
    const user = await this.auth.getAuthenticatedUser(
      email,
      hashedPassword
    );

    return user
  }

  
}



