import React from 'react';

import styles from './LoginPopup.module.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../../../utils/shemas/loginValidation'
import {
  DialogActions,
  Button,
  TextField,
  Alert
} from '@mui/material';
import { createEffect, createEvent, createStore } from "effector";
import {useStore} from "effector-react"

import axios, { AxiosError } from 'axios';


import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';
import { $user, addUser } from '../../../effector/$user';
import { User } from '../../../utils/api/user/user.types';

interface LoginPopupProps {
  EmailRegisterClick: () => void,
  loginClose: () => void,
  loginSuccess:(user:User)=>void
}

interface ValidateLoginProps {
  email: string,
  password: string
}

type ServerError = { message: string };


const LoginPopup: React.FC<LoginPopupProps> = ({ EmailRegisterClick, loginClose,loginSuccess }) => {


  const [errorMessage, setErrorMessage] = React.useState('')
  const [loginDisable, setLoginDisable] = React.useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginSchema)
  })

  function but() {
    if (!errors.email) {
      setLoginDisable(false)
    }
  }

 
  

 
  const onSubmit = async (dto: any) => {

    try {     
      
      loginSuccess(await addUser(dto))
      setErrorMessage('')
        
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          setErrorMessage(serverError.response.data.message)
          console.warn('Login Error', error)
        }
      }

    }
  }



  return (<div className={styles.container}>
    <form
      onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.registerButtonText}>Login with email</span><div style={{ margin: '10px 0px 20px 10px' }}>or <span className={styles.registerButton} onClick={EmailRegisterClick}>Register</span></div>
      <DialogActions disableSpacing={true} sx={{ display: 'block' }}>
        <TextField {...register("email")} onChange={but} placeholder='Mail' variant='outlined' fullWidth size='small' helperText={errors.email?.message} error={!!errors.email?.message} />
        <TextField {...register("password")} placeholder=' Password' size='small' variant='outlined' style={{ marginTop: '20px' }} fullWidth helperText={errors.password?.message} error={!!errors.password?.message} />
        {errorMessage && <Alert className={styles.alert} severity="error">{errorMessage}</Alert>}
        <div className={styles.emailLogin}>

          <Button variant='contained' color="primary" disableRipple={true} type="submit" disabled={loginDisable} >Login</Button>
          <div className={styles.forgetPassword}>Forget password</div>
        </div>
      </DialogActions>
    </form>
  </div>
  )
}



export default LoginPopup