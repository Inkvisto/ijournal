import { useRouter } from 'next/dist/client/router'

import React from 'react'
import { useDispatch } from 'react-redux'
import Home from '..'
import Main from '../../components/MainComponents/Main'
import Post from '../../components/Post/Post'
import { setPostId } from '../../redux/slices/post'
import { Api } from '../../utils/api'
import { PostApi } from '../../utils/api/post/posts'




const NewsPage = ()=> {
   const router = useRouter()
   const route = router.query

 

   const postData = PostApi.getPost(route.id)

const dispatch = useDispatch()
   async function f(){
       const data = await postData
    dispatch(setPostId(data))
   }


   f()
    return(
        <div >
       <Home />
      </div>
    )
}

export default NewsPage


