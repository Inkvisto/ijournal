import axios, { AxiosInstance } from 'axios'
import { useSelector } from 'react-redux';


const  baseURL = 'http://localhost:7777/'

export const CommentApi = {
    async createComment(dto:any):Promise<any>{ 
      const {data} = await axios({method:'post',url:baseURL+'comments/create',data:dto, withCredentials:true});
      return data
    }, 
    
  }

