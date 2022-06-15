import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './RegisterPopup.module.scss'
import LoginSchema from '../../../utils/shemas/loginValidation'
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";

import {
    DialogActions,
    Button,
    TextField, 
    Alert
  } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Api } from '../../../utils/api';
import { RegisterUserDto } from '../../../utils/api/user/user.types';
import { UserApi } from '../../../utils/api/user/user';



  interface RegisterPopupProps {
    EmailLoginClick:()=>void
  }


  type ServerError = { message: string };



const RegisterPopup:React.FC<RegisterPopupProps> = ({EmailLoginClick}) => {
  const[loginDisable,setLoginDisable] = React.useState(true)
  const[errorMessage,setErrorMessage] = React.useState<JSX.Element | null >(null)
  const {register, handleSubmit, formState:{ errors }} = useForm<RegisterUserDto>({
    mode:'onSubmit',
    resolver: yupResolver(LoginSchema)
  })


  const onChange = (token:string | null) => {
  
}  

    return(
      <form
        onSubmit={handleSubmit( async(dto:RegisterUserDto) => {
          try {
            await UserApi.register(dto)
            EmailLoginClick()

          } catch (error) {
            if(axios.isAxiosError(error)){
              const serverError = error as AxiosError<ServerError>;
                if (serverError && serverError.response) {
                  setErrorMessage( <Alert severity="warning" className={styles.alert}>{serverError.response.data.message}</Alert>)
                  console.warn('RegisterError Error',error)
                }
            }
          }
        })}>
 

        <div className={styles.container}>
          <span className={styles.loginButtonText}>Register with email or<br /><span className={styles.loginButton} onClick={EmailLoginClick}>login account</span></span>
        <DialogActions disableSpacing={true} sx={{display:'block'}}>
         <TextField {...register("username", {
          required: true
        })}  placeholder='Full name' variant='outlined' fullWidth size='small'  helperText={errors.username?.message} error={!! errors.username?.message} />
         <TextField {...register("email")}  placeholder=' Email' size='small' variant='outlined' style={{marginTop:'15px'}} fullWidth helperText={errors.email?.message} error={!! errors.email?.message}/>
         <TextField {...register("password")}  placeholder=' Password' variant='outlined' style={{marginTop:'15px'}} fullWidth size='small' helperText={errors.password?.message} error={!! errors.password?.message}/>
        {errorMessage}
         <div className={styles.captcha}>
         <ReCAPTCHA 
         onChange={onChange} sitekey="6Ld3yZ4cAAAAAAAonwFRzjr9_pndHy-XY6HjvMcK" />
         </div>
         <div className={styles.register}>
          <Button
         
           variant='contained' color="primary" disableRipple={true} type='submit'>Register</Button>
          </div>
        </DialogActions>
        </div>
        </form>
    )
}

export default RegisterPopup