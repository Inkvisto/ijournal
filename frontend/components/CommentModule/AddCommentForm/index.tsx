import React,{useState, useRef} from "react";

import styles from './AddCommentForm.module.scss'

import { Input, Button } from '@mui/material';


interface AddCommentFormProps {
    
}

export const AddCommentForm:React.FC<AddCommentFormProps> = () => {
    const[commentField,setCommentField]=useState(false)
    const[sendComment,setSendComment]=useState('')

    const addComment = () => {
        setCommentField(false)
        setSendComment('')
       
    }

    return(
        <div className={styles.container}>
            <Input value = {sendComment} onFocus={()=>setCommentField(true)} onChange={e => setSendComment(e.target.value)} minRows={commentField ? 5 : 1} classes={{root:styles.addComment}} multiline placeholder='Write a comment...' fullWidth />
            {commentField && <Button variant="contained" color="primary" className={styles.addButton} onClick={addComment}>
                    Send
                </Button>}
        </div>
    )
}


