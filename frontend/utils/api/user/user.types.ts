import { BaseType } from "../../constans/base.type";

export type RegisterUserDto = { 
    username:string;
    
} & LoginUserDto;

export type LoginUserDto = { 
    email:string;
    password:string;
}

export type User = {
    email:string;
    password:string;
    username:string;
    role:string,
    avatar:string | null
} & BaseType


export type Tokens = {
    accessToken:string;
    refreshToken:string;
}
