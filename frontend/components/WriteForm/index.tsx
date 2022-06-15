import React from 'react';

import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic'




import Main from '../MainComponents/Main'
import { Api } from '../../utils/api';
import { Alert, Button, Popover } from '@mui/material';
import CategoryPopup from './CategoryPopup';
import { PostApi } from '../../utils/api/post/posts';
import { Category } from '../../utils/api/category/category.types';
import { CategoryApi } from '../../utils/api/category/category';
type E = typeof Editor
const Editor:any = dynamic(()=> import('./Editor').then(m => m.Editor) as Promise<E>,{ssr:false})


interface WriteformProps {
    data?:any;
   
}

export const WriteForm:React.FC<WriteformProps>= () => {
    const [title,setTitle] = React.useState('')
    const [blocks,setBlocks] = React.useState([])
    const [categoriesId,setCategoryIds] = React.useState<Set<string>>()
    const [published,setPublished]  = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    const [open,setOpen] = React.useState(false)
    const [categoryAlertAnchor,setCategoryAlertAnchor]:any = React.useState(null)

    const categoryAlert = Boolean(categoryAlertAnchor);

React.useEffect(()=>{

    
},[blocks])

    const connectCategoriesToPost = (ids:Set<string>) => {
       setCategoryIds(ids) 
    }

  
    const onAddPost = async (e:any) => {
     
    try{
         if(categoriesId !== undefined){
        setLoading(true)   
         const post = await PostApi.createPost({
            title:title,
            content:JSON.stringify(blocks),
            published
        });    
       
        
        categoriesId?.forEach(async(categoryId:string)=>{
            await CategoryApi.connectToPost(post.id,categoryId)
        })
    }else{
        handleCategoryAlertOpen(e)
    }
        
    }
    catch(err){
        console.warn('Create post error', err)
    }
    finally{
        setLoading(false)
    }
    }



    


    const categoryPopupOpen = () => {
        setOpen(true)
    }

    const handleCategoryAlertOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCategoryAlertAnchor(event.currentTarget);
      };
    
      const handleCategoryAlertClose = () => {
        setCategoryAlertAnchor(null);
      };
    


    return(
        <div className ={styles.container}>
            <textarea style={{width:'700px',height:'100px'}} rows={1} maxLength={120} autoFocus={true} onChange={e=>setTitle(e.target.value)}  className={styles.textField} placeholder={'Create your new Post'}></textarea>
            <div className={styles.editor}>
            <Editor onChange={ React.useCallback((arr:any)=>{
               
               
               
                
                setBlocks(arr)
            },[])} />
            </div>
            <div className={styles.buttons} >
                <Button disabled={loading} onClick={(e)=>onAddPost(e)} variant="contained" color="primary" style={{width:'150px',height:'40px',fontSize:'20px'}} >
                    Post
                </Button>
                <Popover
  open={categoryAlert}
  anchorEl={categoryAlertAnchor}
  onClose={handleCategoryAlertClose}
    onClick={handleCategoryAlertClose}
    anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
>
  <Alert severity='info'>Set Category first</Alert>
</Popover>
                <Button color="secondary" variant='outlined'  onClick={categoryPopupOpen} style={{width:'200px',height:'40px',fontSize:'20px'}} > 
                    Set category
                </Button>
                <CategoryPopup 
                connectCategoriesToPost={connectCategoriesToPost}
                open={open}
                setOpen={setOpen}
                
                />
            </div>
        </div>
    )
}

