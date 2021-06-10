import MinecraftEveFstComp from '../MinecraftEveFstComp/MinecraftEveFstComp';
import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import Link from 'next/link';
import MinecraftDialogFstComp from '../MinecraftEveFstComp/MinecraftDialogFstComp.js';
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';

 
export default function MinecraftEveFrthComp(){

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [openSnack,setOpenSnack]=React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };


    return(
      <>
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
        <div className={styles.secondSectionBackground}>
        <Particles zIndex='0' height='300vh' />

        {/*Heading container*/}
                <div className={styles.containerSecond}>
                  <div  >
                  <p className={styles.pTag}>
                    Retos, torneos y sorteos en tus juegos favoritos todas las semanas, 
                    <br/> ¡ahora en nuestra propia plataforma!
                  </p>
                  </div>
                </div>
                
                {/*Img Text container*/}
                <div className={styles.ssSecondContainer}>
                  <div className={styles.ssSecondContainerText}>
                  <div>
                    <h1 className={styles.headlinessSecondContainerText}>
                    ¡Server de Minijuegos!
                    </h1>
                    <p className={styles.headlinessSecondContainerSubText}>
                    ¡Diviértete en 10 mini juegos, <br />
                    incluyendo Party Games, en donde encontrarás otras 11 <br />
                    actividades diferentes para jugar con tus amigos!
                    </p>
                        <Button onClick={handleClickOpen('body')} variant="contained" color="primary" size='large' 
                        className={styles.buttonBlue}>
                        ¡Juega ahora!
                        </Button>
                    </div>
                  </div>
                  <div className={styles.ssSecondContainerImg}>
                    <img className={styles.firstImgss} src="/minecraftStatic9.png" alt=""/>
                    <img className={styles.secondImgss} src="/minecraftStatic8.jpg" alt=""/> 
                  </div>
                </div>
                
                <div className={styles.ssThdSecondContainer}>
                    <div className={styles.ssSecondContainerImg}>
                        <img className={styles.firstImgss} src="/minecraftStatic12.png" alt=""/>
                        <img className={styles.secondImgss} src="/minecraftStatic11.png" alt=""/>  
                  </div>
                  <div className={styles.ssSecondContainerText}>
                  <div>
                    <h1 className={styles.headlinessSecondContainerText}>
                    ¡Demuestra tu valía luchando en Bed Wars!
                    </h1>
                    <p className={styles.headlinessSecondContainerSubText}>
                    Diviértete en este popular juego de estrategia PvP <br/>
                    en el que debes proteger tu cama mientras intentas eliminar <br/>
                    a tus oponentes en islas en el cielo; ¡en más de 10 mapas con tres modalidades diferentes!
                    </p>
                        <Button
                        onClick={handleClickOpen('body')}
                         variant="contained" color="primary" size='large' 
                         className={styles.buttonBlue}>
                        ¡Juega ahora!
                        </Button>
                    </div>
                  </div>
                </div>
               
               {/* Third Container*/}
        <div className={styles.ssThirdContainer}>
        <div className={styles.ssSecondContainerImg}>
        <img className={styles.firstImgts} src="/staticMinecraft15.png" alt=""/>
        <div className={styles.twoImgSideBySidess}>
        <img className={styles.secondImgts} src="/staticMinecraft16.png" alt=""/>
        <img className={styles.thirdImgts} src="/staticMinecraft17.png" alt=""/>
        </div>
        </div>
        <div className={styles.ssSecondContainerText}>
        <div>
        <h1 className={styles.headlinessSecondContainerText}>
          
        ¡Crea tu Imperio y conquista el mundo en Kingdoms!
      </h1>
            <p className={styles.headlinessSecondContainerSubText}>
            Crea tu propio reino y expándelo conquistando territorios. <br/>
            Construye poderosas fortalezas y hermosos palacios. <br/>
            Forja alianzas con otros reinos y aplasta a tus enemigos. <br/>
            ¡Explora nuestro amplio mundo de Minecraft Kingdoms y <br/>
            <strong>gana premios todas las semanas mientras te diviertes!</strong> 
            </p>
            <Button onClick={handleClickOpen('body')} variant="contained" color="primary" size='large' 
                        className={styles.buttonBlue}>
                        ¡Juega ahora!
                        </Button>
            </div>
        </div>
        </div>
        </div>
        </>
    )
} 