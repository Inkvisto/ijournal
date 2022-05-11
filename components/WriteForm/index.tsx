import React from 'react';

import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic'




import Main from '../MainComponents/Main'
import { Api } from '../../utils/api';
import { Button } from '@mui/material';
type E = typeof Editor
const Editor:any = dynamic(()=> import('./Editor').then(m => m.Editor) as Promise<E>,{ssr:false})


interface WriteformProps {
    data?:any;
   
}

export const WriteForm:React.FC<WriteformProps>= () => {
    const [title,setTitle] = React.useState('')
    const [blocks,setBlocks] = React.useState([{ id: '',
    type: 'paragraph',
    data: {
      text: ''
    }}])
    const [published,setPublished]  = React.useState(false)
    const [loading,setLoading] = React.useState(false)


React.useEffect(()=>{
    console.log(blocks);
    
},[blocks])

    const selectOrCreateCategory = () => {

    }

    const onAddPost = async () => {
    try{
        setLoading(true)   
        const post = await Api().post.createPost({
            title:title,
            content:JSON.stringify(blocks),
            published,
        })
    
    }
    catch(err){
        console.warn('Create post error', err)
    }
    finally{
        setLoading(false)
    }
    }


    return(
        <div className ={styles.container}>
            <textarea style={{width:'700px',height:'100px'}} rows={1} maxLength={120} autoFocus={true} onChange={e=>setTitle(e.target.value)}  className={styles.textField} placeholder={'Create your new Post'}></textarea>
            <div className={styles.editor}>
            <Editor onChange={ React.useCallback((arr:any)=>{
               
               
               
                
                setBlocks(arr)
            },[])} />
            </div>
            <div className={styles.buttons} >
                <Button disabled={loading} onClick={onAddPost} variant="contained" color="primary" style={{width:'150px',height:'40px',fontSize:'20px'}} >
                    Post
                </Button>
                <Button variant="contained" color="secondary" style={{width:'200px',height:'40px',fontSize:'20px'}} > 
                    Set category
                </Button>
            </div>
        </div>
    )
}

