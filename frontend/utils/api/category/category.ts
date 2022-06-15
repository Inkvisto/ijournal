import axios, { AxiosInstance } from 'axios'
import { Category } from './category.types';


const  baseURL = 'http://localhost:7777/'


export const CategoryApi = {
  async getCategories(take:number):Promise<any>{   
    const {data} = await axios({method:'get',url:baseURL+`category?take=${take}`,withCredentials:true});
    return data
  },
  async uploadImage(file:any){
    const {data} = await axios({method:'post',url:baseURL+'category/upload',withCredentials:true,data:file})
      return data
  },
  async createCategory(dto:any):Promise<any>{      
      const {data} = await axios({method:'post',url:baseURL+'category/create',withCredentials:true,data:dto})
      return data
  },
    async connectToPost(postId:string,categoryId:string):Promise<any>{
      const {data} = await axios({method:'post',url:baseURL+'category/connectPost',withCredentials:true,data:{postId,categoryId}})
      return data
    }
}


