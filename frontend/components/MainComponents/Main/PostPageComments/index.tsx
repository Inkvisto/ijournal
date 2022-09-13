import SortIcon from '@mui/icons-material/Sort';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styles from '../PostPageMain.module.scss'
import { Button, InputAdornment, TextField } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import React from 'react';
import { Post } from '../../../../utils/api/post/post.types';
import { CommentApi } from '../../../../utils/api/comment/comment';
import Link from 'next/link';
import { Commentary } from '../../../../utils/api/comment/comment.types';
import { createdAtDifference } from '../../../../utils/time/isoToDate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


interface PostPageProps {
    post:Post
}

export const PostPageComments = ({post}:PostPageProps) => {
    const[commentInput,setCommentInput] = React.useState('')
   

    const [rows,setRows] = React.useState(0)
    return(
    <div className={styles.commentsContainer}>
        <div className={styles.commentsHeader}>
        <span>{post?.comments?.length} comments</span>
        <span>
            <SortIcon />
            <NotificationsNoneIcon />
        </span>
       </div>
       <div className={rows !== 4 ? styles.smallCommentsInput : styles.bigCommentsInput} onClick={()=>setRows(4)}>
           {rows !== 4 ? <TextField 
           fullWidth
        multiline
        size='small'
       label='Write comment...' 
       InputProps={{
        endAdornment: (
          <InputAdornment position="end">
           <ImageOutlinedIcon color='success' onClick={()=>console.log(12)} />
          
          </InputAdornment>
        ),
       }}
        
        /> : 
       
       <TextField 
       onChange={e => setCommentInput(e.target.value)}
       minRows={rows}
       multiline
       size='small'
      label='Write comment...'
      InputProps={{
       startAdornment: (
         <InputAdornment position="end">
          <ImageOutlinedIcon color='success' onClick={()=>console.log(12)} />
         
         </InputAdornment>
       ),
       endAdornment:(
            <InputAdornment position="end">
            <Button variant='contained' onClick={()=>{
                CommentApi.createComment({content:commentInput,postId:post.id})
            }} >Send</Button>
            </InputAdornment>
       )
     }}
       />
   
       }
      
     
       
      

       </div>
       <div className={styles.comment}>
       {post.comments && post.comments.map((obj:Commentary)=>(
           <div>
               <article>
                    <Link href={`/profile/cl32oil7j000088xvpdorb0xa-${obj.author.id}`}><a>
                    {obj.author.avatar ?? <div className={styles.userIcon}>{obj.author.username.charAt(0)}</div>} <span>{obj.author.username}</span></a></Link>
                <time> {createdAtDifference(obj)}</time>
                <article>
                        <div>
                        <ArrowBackIosNewIcon />
                        </div>
                        <data>
                        0
                        </data>
                        <div>
                        <ArrowBackIosNewIcon />
                        </div>
                    </article>
               </article>
               <p>{obj.content}</p>
               <small>Answer <MoreHorizIcon /></small>
           </div>
       ))}
       </div>
       </div>
    )
}