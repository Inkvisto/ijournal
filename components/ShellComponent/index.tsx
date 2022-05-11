import React from 'react'
import SideComments from '../CommentModule/SideComments'
import Header from '../Header'
import styles from './Shell.module.scss'
import SideBar from '../SideBarComponents/SideBarContainer'
import Main from '../MainComponents/Main'
import { Post, PostWithCategory } from '../../utils/api/post/post.types'
import { Category } from '../../utils/api/category/category.types'
import { Commentary } from '../../utils/api/comment/comment.types'
import { useRouter } from 'next/router'
import PostPageMain from '../MainComponents/Main/PostPageMain'


type MainProps = {
  posts:[Post],
  loading:any,
  serverError:any,
  categories:[Category]
  comments:[Commentary]
} 

const Shell = (props:Partial<MainProps> & Partial<PostWithCategory>) => {
    const[sideBarVisible,setSideBarVisible] = React.useState(true)
    const router = useRouter()




  const sideBarToggle =() =>{
    if(sideBarVisible === true){
      setSideBarVisible(false)
    }else{
      setSideBarVisible(true)
    }
  }
    return(
        <div className={styles.container}>
          <div className={styles.sticky}>
           <Header menuClick={sideBarToggle} />
         {sideBarVisible ? <div className={styles.sidebar}>
          <SideBar categories={props.categories} />
          </div>: null}
        </div>
        {router.pathname === '/post/[id]' ?
         <div className={styles.postPageMain}>
          <PostPageMain posts={props.posts} category={props.category} post={props.post} /> 
          </div>:
        <div className={styles.main}>
         <Main posts={props.posts} loading={props.loading} serverError={props.serverError}/>
          
        
         
         
        </div>}
     <div className={styles.sidebarComments}>
     <SideComments comments={props.comments} />
     </div>
       
     
        
      </div>
    )
}

export default Shell