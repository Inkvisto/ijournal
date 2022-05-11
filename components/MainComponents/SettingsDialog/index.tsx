import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import styles from './SettingsDialog.module.scss'
import Image from 'next/image';

const groups = [
  {icon:'bf2b6241-bb14-a484-e690-27c3d3e1b9ca/-/scale_crop/64x64/-/format/webp/',
text:'Anime',
id:1},
{icon:'4e7e91fe-d6ef-6175-388e-ce748c0cc809/-/scale_crop/64x64/-/format/webp/',
text:'Memes',
id:2},
{icon:'bf2b6241-bb14-a484-e690-27c3d3e1b9ca/-/scale_crop/64x64/-/format/webp/',
text:'Anime',
id:1},
{icon:'4e7e91fe-d6ef-6175-388e-ce748c0cc809/-/scale_crop/64x64/-/format/webp/',
text:'Memes',
id:2},
{icon:'bf2b6241-bb14-a484-e690-27c3d3e1b9ca/-/scale_crop/64x64/-/format/webp/',
text:'Anime',
id:1},

]


interface SettingsDialogProps {
  open:boolean,
  handleClose:()=>void
}

const SettingsList = groups.map((e)=> <li  key={e.id} className={styles.list}>
  <Checkbox style={{paddingBottom:'3px'}} />
  <i>
  <Image src={e.icon} alt="group icon error" width={24} height={24} className={styles.icons}/>
  </i>
  <span className={styles.text}>{e.text}</span>
  </li>)

const SettingsDialog:React.FC<SettingsDialogProps>= ({open,handleClose}) => {


  

  return (
    <div>
     <Dialog
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{display:'flex',alignItems:'center'}}>
          {"Settings of groups"}
          <DialogActions>
          <Button>Mark all</Button>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          <ul style={{display:'flex',flexWrap:'wrap'}}>
            {SettingsList}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Save</Button>
        </DialogActions> 
      </Dialog>
      </div>
  );
}

export default SettingsDialog