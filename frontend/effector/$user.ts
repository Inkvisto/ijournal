import { createEffect, createStore } from "effector";
import { UserApi } from "../utils/api/user/user";
import { User } from "../utils/api/user/user.types";
import { BaseType } from "../utils/constans/base.type";




export const addUser = createEffect(async(dto:any)=>{
     return UserApi.login(dto)
  })

export const getUser = createEffect(async(user:User)=>{    
    return user
})


  
  
export const $user = createStore<User>({password:'',username:'',email:'',id:'',createdAt:'',updatedAt:'',avatar:null,role:'',categories:[]}).on(addUser.doneData,(_,data)=>data).on(getUser.doneData,(_,data)=>data)

