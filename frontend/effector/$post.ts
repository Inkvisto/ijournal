import { createEffect, createStore } from "effector";
import { Post } from "../utils/api/post/post.types";
import { PostApi } from "../utils/api/post/posts";
import { UserApi } from "../utils/api/user/user";
import { User } from "../utils/api/user/user.types";




export const getPostsTitles = createEffect(async(posts:any)=>{
    return posts
})


export const getCurrentPosts = createEffect(async(posts:any)=>{  
    return posts
})

export const getNextPosts = createEffect(async(currentPosts:any)=>{
    const nextData =  await PostApi.findPosts(10,currentPosts.at(-1)?.id)
    return nextData
})

export const getPost = createEffect(async(id:string)=>{
    return await PostApi.getPost(id)
})


  
export const $postTitles = createStore<any>([]).on(getPostsTitles.doneData,(_,data)=>data)
export const $posts = createStore<any>([]).on(getCurrentPosts.doneData,(_,data)=>data)
export const $nextPosts = createStore<any>([]).on(getNextPosts.doneData,(_,data)=>data)
export const $post = createStore<any>([]).on(getPost.doneData,(_,data)=>data)

