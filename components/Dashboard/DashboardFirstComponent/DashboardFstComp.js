import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Particles from '../../particles/ParticlesBackground.js'

export default function DashboardFirstComp() {


  return (
      <div style={{display:'flex',
                  justifyContent:'center',alignItems:'center',
                  width:'100%', height:'100vh'}}>
           
           <Particles />

           <div className={styles.behindImgBackground} />
      <img className={styles.imgDashboard} src="/dashboardFirstImg.png" alt=""/>

          <div className={styles.imgContainerDashboard} >
          
            <h1 className={styles.h1}>
            Participa gratis por premios <span className={styles.gradientUL}>
            en tus juegos favoritos</span>
               <br/>
            <span style={{color:'#FF00FF'}}> 
            todas las semanas </span>
            </h1>
            
            <p className={styles.pTag}>
            GGs Latam es la plataforma de gamers en Latinoamérica. <br /> 
            Vuélvete parte de la comunidad y participa en eventos de juegos <br />
             como Call of Duty Mobile, Free Fire, Minecraft, Brawl <br />
              Stars, League of Legends ¡y muchos más!</p>

            <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            className={styles.buttonBlue}>
              ¡ÚNETE AHORA!
            </Button>
            </Link>

          </div>

          
        </div>
  );
}