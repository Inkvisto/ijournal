import React from 'react'

import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTypedSelector } from '../../redux/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './Header.module.scss';
import Link from 'next/link';

import { $user } from '../../effector/$user';
import { useStore } from 'effector-react';
import { User } from '../../utils/api/user/user.types';
import { UserApi } from '../../utils/api/user/user';



interface ProfileMenuProps {
user:any,
logOut:()=>void
}


const ProfileMenu = ({user,logOut}:ProfileMenuProps) => {
    const [userInfoMenu,setUserInfoMenu] = React.useState<null | HTMLElement>(null)

    const openUserInfoMenu = Boolean(userInfoMenu)
   
    const handleClickUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setUserInfoMenu(event.currentTarget)
    }
  
    const handleCloseUserMenu = () => {    
      setUserInfoMenu(null)
    }

    const logout = async() => {
        logOut()
        await UserApi.logout()
    }


    return(
    <div style={{display:'flex',alignItems:'center'}}>
      <Link href={`profile/${user.id}-${user.username}`}>
      <Avatar sx={{ bgcolor: '#6573c3',borderRadius:'7px' }} variant="square">
        {user.username.charAt(0)}
      </Avatar>
      </Link>
      <Menu
        anchorEl={userInfoMenu}
        className={styles.userInfoMenu}
        id="account-menu"
        open={openUserInfoMenu}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
          mt: 2.4,
          ml:1,
          width:200,
          height:200,
          'ul':{
          
      
          },
          '& .MuiList-root':{
            display:'block',
            
          },
          'b':{
            pl:'7px'
          },
          'li':{
            p:'20px',
              '&:after':{
              padding:0,
              margin:0,
              display:'block',
              content: '""',
              width:'20%',
              height:'1.1px',
              backgroundColor:'white',
              position: 'absolute',
              left:0,
              top:'-1px',
            },
            
            "&:not(:last-child)":{
              position:'relative',
              borderBottom:'1px solid rgb(230, 230, 230)',
              
            },
            '&:last-child':{
              color:'red',
              'div':{
                ml:'7px'
              }
            },
            pl:'12px',
            justifyContent:'flex-start',
            width:'200px',
            height:'34px',
          
          },
          'span':{
            
            pl:'7px',
            color:'rgb(129, 129, 129)'
          },
          '& .MuiAvatar-root': {
            width: '25px',
            height: '25px',
            
            mr: '5px',
            bgcolor: '#6573c3',
            borderRadius:'7px',
            fontSize:'14px'
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div style={{fontSize:'14px',marginLeft:'15px',marginBottom:'10px'}}>Profile</div>
          <MenuItem>
            <Avatar variant="square">{user.username.charAt(0)}</Avatar><b>{user.username}</b>
          </MenuItem>
          <MenuItem>
            <BookmarkBorderIcon color='disabled'/><span style={{color:'rgb(129, 129, 129)'}}>Bookmarks</span>
          </MenuItem>
          <MenuItem>
            <SettingsIcon color='disabled' />
            <span>Settings</span>
          </MenuItem>
          <MenuItem onClick={logout}>
            <LogoutIcon />
            <div>Exit</div>
          </MenuItem>
      </Menu>
      <div className={styles.userMenuArrowButton} onClick={handleClickUserMenu}>
        <KeyboardArrowDownIcon style={{marginLeft:'5px'}}  />
      </div>
    </div>
    )
}

export default ProfileMenu