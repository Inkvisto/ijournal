import axios, { AxiosInstance } from 'axios'
import { Post } from '../post/post.types';
import { LoginUserDto, RegisterUserDto, Tokens, User } from './user.types';


const  baseURL = 'http://localhost:7777/'

export const UserApi = {
  async register(dto:RegisterUserDto):Promise<any>{   
    return axios({method:'post',url:baseURL+'auth/register',withCredentials:true,data:dto})
  },
  async login(dto:LoginUserDto):Promise<any>{      
      const {data} = await axios({method:'post',url:baseURL+'auth/login',withCredentials:true,data:dto})
      return data
  },
  async refresh(){
    const {data} =  await axios({method:'get',url:baseURL+'auth/refresh',withCredentials:true})
    return data
  },
  async logout(){
    await axios({method:'post',url:baseURL+'auth/logout',withCredentials:true})
  },
    async getUser():Promise<User>{
      const {data} = await axios({method:'get',url:baseURL+'user/get',withCredentials:true})
      return data
    },

}