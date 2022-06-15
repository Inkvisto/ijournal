import React, { KeyboardEvent } from 'react';
import Link from 'next/link'
import Image from 'next/image';

import { Api } from '../../utils/api';

import PopupContainer from '../PopupComponents'


import styles from './Header.module.scss';


import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import ProfileMenu from './ProfileMenu';
import { Button, InputBase, LinearProgress, Toolbar } from '@mui/material';
import { useTypedSelector } from '../../redux/hooks';
import { useStore } from 'effector-react';
import { $user, getUser } from '../../effector/$user';
import { User } from '../../utils/api/user/user.types';
import { UserApi } from '../../utils/api/user/user';
import { PostApi } from '../../utils/api/post/posts';



interface HeaderProps {
  menuClick:()=>void,
}



const Header = ({menuClick}:HeaderProps) => {
  
  const [inputValue,setInputValue] = React.useState('')
  const [popupVisible, setpopupVisible] = React.useState(false);
  const [progressLoad,setProgressLoad] = React.useState(0)


  const handleLoginOpen = () => {
    setpopupVisible(true);
  };

  const handleLoginClose = () => {
    setpopupVisible(false);
  };

  const [loginValue, setLoginValue] = React.useState<JSX.Element | null>(null)

   React.useEffect(()=>{
   UserApi.getUser()
    .then((response:User)=>{   
      getUser(response)
      setLoginValue(
  
        <ProfileMenu user={response} logOut={logout} />
     )
    })
    .catch((e)=>{
      UserApi.refresh()
      .then((response:User)=>{
        setLoginValue(
  
          <ProfileMenu user={response} logOut={logout} />
       )
      })
      .catch((e)=>{
        console.warn(e)
      })

      setLoginValue(
        <div className={styles.loginPanel} onClick={handleLoginOpen}>
        <AccountCircleOutlinedIcon />
        <div className={styles.login}>Login</div>
        </div>
      );
    })
    setProgressLoad(100)
  },[])

const loginSuccess = ((user:User)=>{
  getUser(user)
  setLoginValue(<ProfileMenu user={user} logOut={logout} />)
  handleLoginClose()
 })

 const logout = () => {
  setLoginValue(
    <div className={styles.loginPanel} onClick={handleLoginOpen}>
    <AccountCircleOutlinedIcon />
    <div className={styles.login}>Login</div>
    </div>
  );
 }




  const searchEnter = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){

      setInputValue(e.currentTarget.value)

      try{

        (async()=>{await PostApi.search(e.currentTarget.value)})()

      }

      catch(err:unknown){

        if (err instanceof Error){throw new Error('Server search engine error',{cause:err})}

      }
    }
  }



  return (
    <div className={styles.container}>
      <Toolbar className={styles.bar}>
        <div className={styles.menu} onClick={menuClick}>
          <MenuIcon />
        </div>
        <div className={styles.logo}>
          <Link href='/' passHref>
          <Image 
            src='/static/logo.svg' 
            alt='logo undefined' 
            width={50} 
            height={40} 
          />
          </Link>
        </div>
        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onKeyDown={searchEnter}
            placeholder="Search…"
            className={styles.searchInput}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={styles.addButton}>
          <Link href='/profile/write' passHref>
            <Button>Add Post</Button>
          </Link>
        </div>
        <div/>
        <div className={styles.sectionDesktop}>
          <div className={styles.sectionNotification}>
            <NotificationsNoneIcon />
          </div>
         {loginValue}
        </div>
      </Toolbar>
      <div className={styles.progress}>
        <LinearProgress  variant="determinate" value={progressLoad} style={{ height: '1px', color: 'rgb(255,69,0)' }} />
      </div>
      <PopupContainer onClose={handleLoginClose} visible={popupVisible} loginSuccess={loginSuccess} />
    </div>
  );


 
}



export default Header


