import { BaseType } from "../../constans/base.type";
import { User } from "../user/user.types";


export type Commentary  = {
    id:string;
    likes:number;
    authorId:string;
    content:string[];
    postId:string;
    author:User
} & BaseType