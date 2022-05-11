
import { NextPage } from 'next'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import styles from './Post.module.scss'



const Post:NextPage = ()=> {
 const postData = useSelector((state:RootStateOrAny)=>state.post.postId)

 try{
        return(
        
            <div className={styles.block}> 
            <ul className={styles.main}>
                         <p className={styles.title}>
                        {postData.title}
                        </p>
                        {postData.author.username}
                <li>
                    <div className={styles.mainHeader}>
                     
        <div className={styles.comments} key={postData.id}>
               
                    <p className={styles.text}>
                        {postData.content}
                    </p>  
        </div>
        
                    </div> 
                    
                 </li>
            </ul>
            <div>
            
            </div>
            </div>
         
        )
     
 }
 catch(err){

    return(
        <div>Post undefined</div>
    )
 }
}

export default Post