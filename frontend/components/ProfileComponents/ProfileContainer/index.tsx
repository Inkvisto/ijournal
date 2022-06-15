import { Avatar, Button } from '@mui/material'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from './ProfileContainer.module.scss'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import Link from 'next/link';

import ProfileArticles from '../ProfileArticles'
import ProfileSubscriptions from '../ProfileSubscriptions';
import ProfileComments from '../ProfileComments'
import Image, { ImageProps } from 'next/image';
import { minioImageLoader } from '../../../utils/constans/minioImageLoader';
import {  useTypedSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/slices/user';
import { useStore, useStoreMap } from 'effector-react';
import { $user } from '../../../effector/$user';
import { User } from '../../../utils/api/user/user.types';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }


  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div className={styles.tabsContainer}>
            {children}
          </div>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }





const ProfileContainer = ({user}:{user:User}) => {

   

  const date = new Date(user.createdAt).toLocaleString('default', {day:'numeric', month: 'long',year:'numeric' })
   



    const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
    return(
        <div className={styles.container}>
  
            <div className={styles.main}>
                <div className={styles.header}>
               
             
                {(user.avatar &&  
                  <Image 
                loader={minioImageLoader} 
                src={user.avatar}
                width='10%' 
                height='10%' 
                layout='responsive'
                objectFit='none'
                alt='profile_image_error'
                  />) ??   <Avatar sx={{ bgcolor: '#6573c3',borderRadius:'7px',width: 100, height: 100, fontSize:'45px' }} variant="square" >
                  {user.username.charAt(0)}
                </Avatar>}
                <div className={styles.buttons}><button><i><SettingsOutlinedIcon /></i></button>
                <Button variant="contained"><SmsOutlinedIcon />Write</Button>
                </div>
                </div>
                <p className={styles.userName}>{user.username}</p>
                <Link href='/changeNamePage'><a className={styles.changeNameLink}>Change Name or description</a></Link>
                <div className={styles.joinDateText}><span >In project from {date}</span></div>
                <div className={styles.tabs}>
                        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Articles" {...a11yProps(0)} />
                        <Tab label="Comments" {...a11yProps(1)} />
                        <Tab label="Drafts" {...a11yProps(2)} />
                        </Tabs>
                    
                    </div>
                            </div>
                            
     <div className={styles.tabsContent}>
        <TabPanel value={tab} index={0}>
            <div className={styles.flexContainer}>
              <div className={styles.profileArticlesGrid}>
        {user.avatar && <ProfileArticles miniAvatar={user.avatar} avatarLoader={minioImageLoader} />}
        </div>
        <div>
        <ProfileSubscriptions />
        </div>
        </div>
    </TabPanel>
    <TabPanel value={tab} index={1}>
    <div className={styles.flexContainer}>
              <div className={styles.profileCommentsGrid}>
        <ProfileComments />
        </div>
        <div>
        <ProfileSubscriptions />
        </div>
        </div>
    </TabPanel>
    <TabPanel value={tab} index={2}>
        Item Three
    </TabPanel>
    </div>
    </div>
    )
}

export default ProfileContainer





