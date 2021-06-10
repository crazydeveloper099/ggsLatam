import styles from './css/styles.module.css';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

export default function InfluencerEveFourthComp(){
return(
    <div className={styles.main}>
        <img className={styles.img} 
        src="https://nox.uno/wp-content/uploads/2020/05/brawl-stars.jpg"
         alt=""/>
        <div className={styles.imgOverlay} />
        <div className={styles.textLayer}>
            <div className={styles.heading}>
                <span style={{color:'#FF00FF'}}>BRAWL STARS</span>
                <br/>
                RETO DE 48 MONEDAS
            </div>
            <Link href="/register">
                        <Button variant="contained" color="primary" size='large' 
                            style={{background:'#8A2BE2', 
                                    fontSize:'1vw',
                                    margin:'0 auto',
                                    padding:'0.7vw 4vw', 
                                    marginTop:'1vw'}}>
                            PARTICIPA AHORA
                            </Button>
                            </Link>
        </div>
    </div>
)
}