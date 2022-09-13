import { useRouter } from 'next/dist/client/router'

import React from 'react'
import { useDispatch } from 'react-redux'
import Home from '..'
import { setPostData } from '../../redux/slices/post'
import { PostApi } from '../../utils/api/post/posts'




const NewsPage = ()=> {
   const router = useRouter()
   const route = router.query


   const postData = PostApi.getPost(route.id)

const dispatch = useDispatch()
   async function f(){
       const data = await postData
    dispatch(setPostData(data))
   }


   f()
    return(
        <div >
       <Home />
      </div>
    )
}

export default NewsPage


