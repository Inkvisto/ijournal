import React, { useState } from 'react'
import styles from './PopularMain.module.scss'
import Button from '@mui/material/Button';
import SettingsDialog from '../SettingsDialog';
import Link from 'next/link';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ThemeProvider } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const PopularMain = () => {
const [open, setOpen] = React.useState(false);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};



  
    return (    
      <div className={styles.container}>
        <div className={styles.configureButton}>
        <Button color='inherit' onClick={handleClickOpen}>
            <i className={styles.configureSvg}>
            <SettingsOutlinedIcon fontSize='small' />
            </i>
            <span className={styles.configureText}>
                Configure a settings
            </span>
          </Button>
          </div>
         <div className={styles.buttons}><Button>Popular<i className={styles.icon}><KeyboardArrowDownIcon /></i></Button>
         <Link href='/newest' passHref><Button>Newest</Button></Link></div>

     <SettingsDialog open={open} handleClose={handleClose} />
    </div>
    )
    }

export default PopularMain