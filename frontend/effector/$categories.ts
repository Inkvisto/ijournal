import { createEffect, createStore } from "effector";
import { CategoryApi } from "../utils/api/category/category";
import { Post } from "../utils/api/post/post.types";
import { PostApi } from "../utils/api/post/posts";
import { UserApi } from "../utils/api/user/user";
import { User } from "../utils/api/user/user.types";




export const getCategories = createEffect(async()=>{
    return await CategoryApi.getCategories(6)
})

export const $categories = createStore<any>([]).on(getCategories.doneData,(_,data)=>data)