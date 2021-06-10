import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'

export default function InfluencerEveFirstSec() {

    


  return (
      <div style={{display:'flex',
                  justifyContent:'center',alignItems:'center',
                  width:'100%', height:'100vh'}}>
           
           <Particles zIndex='3' height='100vh' />


      <div className={styles.bendingImgBackTint} />
      <img className={styles.imgDashboard} 
      src="https://images8.alphacoders.com/406/thumb-1920-406809.jpg"
       alt=""/>

          <div className={styles.imgContainerDashboard} >
          {/* <div style={{alignSelf:'start',verticalAlign:'middle'}}> */}
            {/* <img src="/ggsLogo.png" style={{height:'4vw'}}  /> */}
            
            <h1 className={styles.h1}>
            <span style={{color:'orange'}}>LEAGUE OF LEGENDS</span><br/>
            1V1 CHALLENGE   <br/>
            
            </h1>
            
            <p style={{color:'white',textAlign:'left', fontSize:'1vw'}}>
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,<br/> Sed Diam Nonumy
            Eirmod Tempor Invidunt Ut Labore Et Dolore Magna <br/> Aliquyam Erat, Sed Diam
            Voluptua.</p>

            <Link href="/register">
            <Button variant="contained" color="primary" size='large' 
            style={{background:'#9400D3', 
                    fontSize:'0.9vw', 
                    padding:'1vw 4vw', 
                    marginTop:'2vw'}}>
              PARTICIPA AHORA
            </Button>
            </Link>
            </div>

          
        </div>
  );
}