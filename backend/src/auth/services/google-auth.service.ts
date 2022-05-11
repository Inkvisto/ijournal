import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Auth, google } from "googleapis";
import { AuthService } from "./auth.service";
import { UserService } from "../../user/user.service";

@Injectable()
export class googleAuthService {
    oauthClient:Auth.OAuth2Client;
    constructor(
        private readonly userService:UserService,
        private readonly configService:ConfigService,
        private readonly authService:AuthService,
    ){
        const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        )
    }

    async authenticate(token:string) {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);

        const email = tokenInfo.email;

        try{
            const user = await this.userService.getByEmail(email);
 
         //   return this.handleRegisteredUser(user);
        } catch (err) {
            if(err.status !== 404){
                throw new err;
            }
            return this.registerUser(token,email)
        }
    }


    async registerUser(token: string, email: string) {
        const userData = await this.getUserData(token);
        const name = userData.name;
       
       // const user = await this.userService.createWithGoogle(email, name);
       
       // return this.handleRegisteredUser(user);
      }

      async getUserData(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;
       
        this.oauthClient.setCredentials({
          access_token: token
        })
       
        const userInfoResponse = await userInfoClient.get({
          auth: this.oauthClient
        });
       
        return userInfoResponse.data;
      }
}