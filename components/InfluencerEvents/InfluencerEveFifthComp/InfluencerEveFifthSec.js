import Iframe from 'react-iframe'
import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Particles from 'react-particles-js';

export default function InfluencerEveFifthSec() {
    return(
        <div className={styles.main}>
        <div className={styles.topContent}>
        <div className={styles.videoContainer}>
            <Iframe url="https://www.youtube.com/embed/RJ0jdO5ZfU4"
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
            <div className={styles.titleText}> 
            <span style={{color:'#FF00FF'}}>Minecraft </span>
             Server
            </div>
            <p style={{color:'#d8d8d8',textAlign:'start', fontSize:'1vw'}}>
            Únete a nuestra Network oficial de Minecraft, en la que podrás
            divertirte <br/>
            sólo/a o con tus amigos, ¡y ganar <span style={{color:'#FF00FF', fontWeight:'500'}}>GRANDES</span> premios <br/>
            <span style={{color:'#FF00FF', fontWeight:'500'}}>TODAS </span> las semanas!
            </p>
            <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            style={{background:'#8A2BE2', 
                    fontSize:'1vw', 
                    padding:'1vw 5vw', 
                    marginTop:'2vw'}}>
              Register
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