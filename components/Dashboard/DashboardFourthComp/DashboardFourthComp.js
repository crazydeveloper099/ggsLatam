import Iframe from 'react-iframe'
import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Particles from 'react-particles-js';

export default function DashboardFourthComponent() {
    return(
        <div className={styles.main}>
        <div className={styles.topContent}>
        <div className={styles.videoContainer}>
            <Iframe url="https://www.youtube.com/embed/1YDBSG-rC6Q"
                width="100%"
                height="100%"
                id="myId"
                display="initial"
                position="relative"
                frameBorder={0}
                styles={{borderRadius: '10px'}}
            />
        </div>
        
        <div className={styles.textContainer}>
            <div className={styles.titleText}>Únete a nuestra Network Oficial de Minecraft</div>
            <p className={styles.pTag}>
            ¡Únete ya a nuestra Network de Minecraft, y gana grandes premios todas las semanas mientras te diviertes con tus amigos!
            </p>
            <Link href="/minecraft">
            <Button variant="contained" color="primary" size='large' 
            className={styles.buttonBlue}>
              ¡Únete ahora!
            </Button>
            </Link>
        </div>
        </div>
        <div className={styles.imgBackground}>
      <Particles width='90vw' height='50vh'
      params={{
        particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800
              }
            },
            line_linked: {
              "color": {
                "value": "#ce00ce"
              },   
            shadow: {
            	enable: true,
            	color: "#ce00ce",
            	blur: 5
            }
        }}}}/>
       </div>
    </div>
    )
}