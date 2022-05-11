import Image from 'next/image';
import React, { useEffect } from 'react'
import { Socket } from 'socket.io-client';
import { Api } from '../../../utils/api';
import { socket } from '../../../utils/api/socket';
import styles from './Comment.module.scss'
interface CommentProps {
    username:string;
    text:string;
    createdAt:string;
    avatar:string;
    avatarStyle:object;
    
}


const Comment = ({comments}:any) => {

    

    
    let [likesCount,setLikesCount] = React.useState(0)




 
    const handleSubmitNewMessage = (likes:any,id:any) => {
       
          socket.emit('click',[id,likes])
          setLikesCount(likesCount+=1)
        }
       


        return(
           <div>
               {
                   comments.map((obj:any)=>(
                       <ul className={styles.list}>
                           <li>
                           <p>{obj.content}</p>
                           <p>{obj.likes}
                                 <button onClick={()=>handleSubmitNewMessage(obj.likes+=1,obj.id)}>+</button>
                                 
                            
                           </p>
                           </li>
                       </ul>
                   ))
               }
           </div>

        )
    
}

export default Comment

