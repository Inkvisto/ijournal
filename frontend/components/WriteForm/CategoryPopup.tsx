import { Alert, AlertTitle, Button, Checkbox, Dialog, DialogActions, DialogTitle, List, ListItem, Menu, MenuItem, Popover, TextField } from "@mui/material"
import Image from "next/image";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../utils/api";
import { CategoryApi } from "../../utils/api/category/category";
import { Category } from "../../utils/api/category/category.types";
import { minioImageLoader } from "../../utils/constans/minioImageLoader";
import { useJSX } from "../../utils/hooks/useJSX";
import LoginSchema from "../../utils/shemas/loginValidation";
import styles from './CategoryPopup.module.scss'



interface CategoryPopupProps {
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    connectCategoriesToPost:(ids:Set<string>)=>void
}

const CategoryPopup = ({open,setOpen,connectCategoriesToPost}:CategoryPopupProps) => {

    const [menuAnchor,setMenuAnchor] = React.useState<HTMLButtonElement | null>(null);
    const [popupAnchor,setPopupAnchor] =  React.useState<HTMLButtonElement | null>(null);

    const [jsxAlert,setJsx]:any = useJSX()
    
    const [categories,setCategories]:any = React.useState()

    const [categoryImage,setCategoryImage]:any = React.useState('')
    const [nonAuthAlert,setNonAuthAlert]:any = React.useState(null)
  
  
    const categoriesIds:Set<string> = new Set()


    const openMenu = Boolean(menuAnchor);
    const openPopUp = Boolean(popupAnchor);

    
    const handleMenuOpen= (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchor(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setMenuAnchor(null);
    };

    const handlePopupOpen= (event: React.MouseEvent<HTMLButtonElement>) => {      
      setPopupAnchor(event.currentTarget ?? event.target);
      setJsx( 
        <Alert severity="warning" onClick={handlePopupClose}>
        
        Upload image first
       </Alert>)
    };
  
    const handlePopupClose = () => {
      setPopupAnchor(null);
    };


 

    const handleChange = (id:string) => {           
      categoriesIds.has(id) ? categoriesIds.delete(id) : categoriesIds.add(id)       
    };

    const initialFormData = {
        file: '',
        imagePreviewUrl: ''
      };
    const [formData, updateFormData]:any = React.useState(initialFormData);

    const handleInputChange = (e:any) => {
        e.preventDefault()
        let reader = new FileReader();
        let file = e.target.files[0];
      
        reader.onloadend = () => {
          updateFormData({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
          reader.readAsDataURL(file)
    };


    const { register, handleSubmit, formState: { errors } } = useForm()
  
    const loadImage = (element:any) => {
      let formImageData = new FormData();
      try{
      formImageData.append('image', formData.file, formData.name);

    

        (async()=>await CategoryApi.uploadImage(formImageData)
        .then((response:any)=>{
         const url = response.image_url   
          setCategoryImage(url.substring(url.lastIndexOf("/")+1,url.length))
        })
        .catch((e:any)=>setNonAuthAlert(
          <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          You are not authorized, only authorized users can create categories
        </Alert>
        )))()
        }catch(e){    
          handlePopupOpen(element)
        }
     
    };



    React.useEffect(()=>{
        (async()=>{
            setCategories(await CategoryApi.getCategories(30))
        })()
        
    },[])


    let {imagePreviewUrl} = formData;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (null);
    }



    const onSubmit = async (data:any,e:any) => {     
       if(categoryImage !== ''){
        await CategoryApi.createCategory({name:data.name,image_url:categoryImage})
        setCategories(await CategoryApi.getCategories(30))
       handleMenuClose()
       }else{
         handlePopupOpen(e)
       }
    }


    return(
        <div className={styles.container}>
       <Dialog onClose={()=>setOpen(false)}  open={open} maxWidth='md' fullWidth scroll="body" >
       <div>
          {nonAuthAlert}
        </div>
       
      <List className={styles.list}>
          {categories && categories.map((e:Category)=>(
              <ListItem>
            <Image width={30} height={30} objectFit='cover' loader={minioImageLoader} src={e.image} alt='category_image_error' className={styles.listCategoryImages} />
            <span>
            {e.name}
            </span>
            <Checkbox  
            onChange={()=>handleChange(e.id)} />
          
            </ListItem>
          ))
          }
       
      </List>
      <DialogActions sx={{display:'flex',justifyContent:'space-around'}}>
            <Button color='secondary' onClick={()=>{
              connectCategoriesToPost(categoriesIds)
              setOpen(false)
              }}> Set categories</Button>
            <Button  onClick={handleMenuOpen} color='inherit' >Create category</Button>
          <Button onClick={()=>{
            setOpen(false),
            setNonAuthAlert(null)}}>Close</Button>
        </DialogActions>
    
                <Menu
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={handleMenuClose}
        
      > <form id = 'form' onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <MenuItem sx={{height:'100px',display:'block'}}  onKeyDown={e => e.stopPropagation()}>
          
       <p style={{marginBottom:'10px'}}>
       Please write a name of category
       </p>
        <TextField label="name" variant="outlined"  size="small" {...register("name", {
           required:'Name is required' ,minLength:{
            value:3,
            message:'Length of name must be more than 3'
          },maxLength:{
            value:20,
            message:'Length of name must be less than 20'
          }
        })} helperText={errors.name?.message} error={!!errors.name?.message}   />
       
        </MenuItem>
        <MenuItem sx={{height:'60px',display:'block'}}>
        <div className={styles.UploadImages}>
          {$imagePreview}
      
          <label htmlFor="upload_image">
          Load image</label>
          <input name = "form_input" onChange={handleInputChange} type='file' id='upload_image' />
          <Button variant="contained" onClick={loadImage} >Upload</Button>
          </div>
        </MenuItem>
        <MenuItem>
        <Button color='inherit' type='submit'>
          Create category
        </Button>
        </MenuItem>
        </form>
        <Popover
        open={openPopUp}
        anchorPosition={{ top: 200, left: 400 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopupClose}
          >
        {jsxAlert}
        </Popover>
      </Menu>
     
      
    </Dialog>

    
      </div>
     )
}

export default CategoryPopup