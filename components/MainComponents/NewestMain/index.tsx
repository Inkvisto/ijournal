import React, { useState } from 'react'
import styles from './NewestMain.module.scss'
import Button from '@mui/material/Button';
import SettingsDialog from '../SettingsDialog';
import Link from 'next/link'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ThemeProvider } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const NewestMain = () => {
const [open, setOpen] = React.useState(false);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};




  
    return (
      <div className={styles.container}>
        <Button color='inherit' onClick={handleClickOpen}>
            <i className={styles.configureSvg}>
            <SettingsOutlinedIcon fontSize='small' />
            </i>
            <span className={styles.configureText}>
                Configure a settings
            </span>
          </Button>
         <div className={styles.buttons} ><Link href='/' passHref><Button>Popular</Button></Link>
            <Button>Newest<i className={styles.icon}><KeyboardArrowDownIcon /></i></Button></div>

     <SettingsDialog open={open} handleClose={handleClose} />
    </div>
    )
    }

export default NewestMain