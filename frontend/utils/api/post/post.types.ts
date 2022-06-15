import { BaseType } from "../../constans/base.type";
import { Category } from "../category/category.types";
import { User } from "../user/user.types";

export type Post = {
    content:string;
    title:string;
    published:boolean;
    authorId:string;
    views:number;
    author:User,
    comments:any
 } & BaseType
 
 export type PostCreate = {
     content:string;
     title:string;
     published:boolean;
 }

 export type PostWithCategory  = {
     post:Post,
     category:Category
 }