import axios, { AxiosInstance } from 'axios'
import { Post } from '../post/post.types';
import { LoginUserDto, RegisterUserDto, Tokens, User } from './user.types';



export const UserApi = (instanse:AxiosInstance) =>({
    async register(dto:RegisterUserDto):Promise<User>{
        const {data} = await instanse.post<RegisterUserDto, { data: User}>('/auth/register',dto);
        return data;
    },
    async login(dto:LoginUserDto):Promise<Tokens>{
        const {data} = await instanse.post<LoginUserDto, { data: Tokens}>('/auth/login',dto);
        
        return data;
    },
    async getUser(dto:{accessToken:string}):Promise<User | undefined>{
        const data = await instanse.post<{accessToken:string},{ data: User}>('/auth/user',dto).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }

              });
        return data?.data;
    },
    async getUserNameByPosts(dto:{posts:Post}):Promise<any>{
        const {data} = await instanse.post('/user/getUserNameByPosts',dto)
        return data
    }
});