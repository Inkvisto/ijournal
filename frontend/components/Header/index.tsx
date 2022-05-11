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

   React.useEffect(()=>{
    setProgressLoad(100)
  },[])


  const searchEnter = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){

      setInputValue(e.currentTarget.value)

      try{

        (async()=>{await Api().post.search(e.currentTarget.value)})()

      }

      catch(err:unknown){

        if (err instanceof Error){throw new Error('Server search engine error',{cause:err})}

      }
    }
  }

  const userData = useTypedSelector(state=>state.user)



  const username = userData.user.username


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
         {username !== '' ? 
            (<ProfileMenu />)
          :( 
            <div className={styles.loginPanel} onClick={handleLoginOpen}>
            <AccountCircleOutlinedIcon />
            <div className={styles.login}>Login</div>
            </div>
          )}
        </div>
      </Toolbar>
      <div className={styles.progress}>
        <LinearProgress  variant="determinate" value={progressLoad} style={{ height: '1px', color: 'rgb(255,69,0)' }} />
      </div>
      <PopupContainer onClose={handleLoginClose} visible={popupVisible} />
    </div>
  );
}



export default Header


