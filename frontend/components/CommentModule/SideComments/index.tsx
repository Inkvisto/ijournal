import React,{ useState } from "react";
import styles from './SideComments.module.scss'


import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Commentary } from "../../../utils/api/comment/comment.types";
import Image from "next/image";
import { minioImageLoader } from "../../../utils/constans/minioImageLoader";
import { Button } from "@mui/material";



interface SideCommentsProps {

}


const SideComments = ({comments}:any) => {
    const[visible,setVisible] = useState(true)
    
    return(
        <div>
            {visible ? (
                <div className={styles.container}>
                  <div className={styles.commentsButton} onClick={()=>setVisible(false)}>
                <Button color='inherit' style={{ backgroundColor: 'transparent',paddingLeft:'0px' }}>
                    Comments
                </Button>
                <ChevronRightIcon />
                </div>
                <ul>
                    {comments && comments.map((e:Commentary)=>(
                        <li className={styles.list}>
                           <p>
                          
                                <Image
                                loader={minioImageLoader}
                                src={e.author.avatar ?? '7a627d0225e1f999d970495496fb2ca8.jpg'}
                                width={25} 
                                height={25} 
                                objectFit='cover'
                                style={{borderRadius:'5px'}}
                                />
                             <p>
                           {e.author.username}
                           </p>
                           </p>

                            <span className={styles.content}>
                                {e.content}
                            </span>
                        </li>
                    ))}
                </ul>
        
                </div>
            ):(
                <div onClick={()=>setVisible(true)} className={styles.rotateComments}>
                    Comments
                    <ExpandLessIcon className={styles.svg} />
                </div>
            )}
        </div>
        
    )
}

export default SideComments