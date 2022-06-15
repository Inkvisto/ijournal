import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useStore } from 'effector-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { $post, $posts } from '../../../effector/$post';
import { Category } from '../../../utils/api/category/category.types';
import { Post } from '../../../utils/api/post/post.types';
import { PostApi } from '../../../utils/api/post/posts';
import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import { dateDiffInDays, dateDiffInHours } from '../../../utils/time/isoToDate';
import ImagePost from './ImagePost';
import ParagraphPost from './ParagraphPost';
import styles from './PostPageMain.module.scss'


interface PostPageMainProps {
 post:Post
 category:Category
 posts:Post[]
    
}



const PostPageMain = () => {
    const[data,setData]:any = React.useState({post:{},category:{image:'image'}})
    const router = useRouter()

    
  React.useEffect(()=>{
     
      
      (async()=>{
        router.query.id && setData(await PostApi.getPost(router.query.id))
      })()
   
  },[router])


  const {post,category} = data;

    const a = (createdAt:string) => new Date(createdAt);
    const  b = new Date();
    const parsedContent = () => {
        return  post.content !== undefined ? JSON.parse(post.content) : []
     }

   
    


const postBaseRender = (content:any) => {
    const res = []
    
    for(let obj of content){   
        
        switch (obj.type) {
            case "image":
                res.push(<ImagePost data={obj.data} />)
               
           case "paragraph":
                res.push(<ParagraphPost data={obj.data} />)
             
        }
    }
   return res
    
   
}





    return(
        <div className={styles.block}>
            {data.category &&
          <>
            <div className={styles.postHeader}>
              
                <span>
                    <Image loader={minioImageLoader} src={category.image} alt='avatar_image_error' width={25} height={25} objectFit='cover' />
                <span>
               
                <div className={styles.username}>
                    {category.name}
                </div>
                <div className={styles.date}>
                {dateDiffInHours(a(post.createdAt), b)<24 ? (dateDiffInHours(a(post.createdAt), b)+' hours') : (dateDiffInDays(a(post.createdAt),b)+' days')
                } 
                </div>
                </span>
                
                </span>
                <MoreHorizIcon />
                </div>
              
                <div className={styles.postMain}>
                <h1>
                    Title
                </h1>
                
                  {postBaseRender(parsedContent())}
                 
                </div>
                </>
}
        </div>
        
    )
}

export default PostPageMain

