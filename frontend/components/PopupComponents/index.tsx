import React,{ useState } from "react"

import {
  Dialog, ThemeProvider,
} from '@mui/material';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Popup.module.scss'
import MainPopup from "./MainPopup";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

import Image, { ImageLoaderProps } from "next/image";
import { User } from "../../utils/api/user/user.types";




interface PopupProps {
  onClose:() => void,
  visible:boolean,
  loginSuccess:(user:User)=>void
}


const PopupContainer:React.FC<PopupProps> = ({onClose,visible,loginSuccess}) => {
  const [auth,setAuth] = useState<'main' | 'login' | 'register'>('main')


const closeAuth = () => {
    setAuth('main')
 }
  
  function onAuth(){
    onClose()
    setTimeout(closeAuth, 400)
}



    const EmailLoginClick = () => {
      setAuth('login')
    }

    const EmailRegisterClick = () => {
      setAuth('register')
    }

    return(
        <div>
          <Dialog open={visible} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <div className={styles.container}>
          
             <div className={styles.image}>
             <Image layout="responsive" width={0} height={0} src="/static/popup_login.avif" alt='popup_image_error' />
             </div>
             
              <div className={styles.emailCross}>
                <CloseIcon onClick={onAuth}/>
              </div>
              {auth === 'main' ? (<div className={styles.join}>Join IJ</div>): (
                  <div className={styles.emailContainer}>
                    <div onClick={()=>setAuth('main')} className={styles.backButton}>
                      <NavigateBeforeIcon />  
                      Back to auth  
                    </ div>
                  </div>)}
              <div className={styles.main}>
              { auth === 'main' && (<MainPopup EmailLoginClick={EmailLoginClick} />)}
              { auth === 'login' && (<LoginPopup loginClose={onClose} EmailRegisterClick={EmailRegisterClick} loginSuccess={loginSuccess} />)}
              { auth === 'register' && (<RegisterPopup EmailLoginClick={EmailLoginClick}/>)}
              <div className={styles.footer}><span>By logging in,   you agree to the 
                <a href='/terms' className={styles.footerLink}> terms of use of the site </a>
                 and 
                 <a href='/agreement' className={styles.footerLink}>    consent to the processing of personal data.</a></span></div>
              </div>
            </div>
          </Dialog>
        </div>
    )
}

export default PopupContainer