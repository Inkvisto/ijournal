import { BaseType } from "../../constans/base.type";
import { Category } from "../category/category.types";

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
    role:string;
    avatar:string | null;
    categories:Category[]
} & BaseType


export type Tokens = {
    accessToken:string;
    refreshToken:string;
}
