import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import {useState,useEffect,useRef} from 'react'

import MinecraftDialogFstComp from './MinecraftDialogFstComp.js';
import Snackbar from '@material-ui/core/Snackbar';

export default function MinecraftEveFstComp() {


  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [openSnack,setOpenSnack]=useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

 


  return (
      <div className={styles.main}>
      <div className={styles.bendingImgBackTint} />
      <img className={styles.imgDashboard} 
      src="https://i.pinimg.com/originals/aa/d7/af/aad7afe86eef4d36ba969567c2f9a7d1.jpg"
       alt=""/>

          <div className={styles.imgContainerDashboard} >
          {/* <div style={{alignSelf:'start',verticalAlign:'middle'}}> */}
            {/* <img src="/ggsLogo.png" style={{height:'4vw'}}  /> */}
            
           


            <h1 className={styles.h1}>
            <span style={{color:'orange'}}> GGs Latam </span>
            presenta:<br/>
            
            </h1>
            
            <p className={styles.pTag}>
            Network oficial de Minecraft, en la que podrás <br />
            divertirte sólo/a o con tus amigos,<br />
            ¡y ganar GRANDES premios TODAS las semanas!<br /></p>

            
            <Button variant="contained" color="primary" size='large' 
            onClick={handleClickOpen('body')}
            className={styles.buttonBlue}>
              ¡Juega ahora!
            </Button>
            </div> 
    <MinecraftDialogFstComp 
    openDialog={open} 
    setOpenDialog={setOpen} 
    scroll={scroll}
    setOpenSnack={setOpenSnack} />
            
      <Snackbar
               anchorOrigin={{
                   vertical:'bottom',
                   horizontal:'left'
                }}
                open={openSnack}
                onClose={()=>setOpenSnack(false)}
                message="Copied!"
            />
        </div>
  );
}