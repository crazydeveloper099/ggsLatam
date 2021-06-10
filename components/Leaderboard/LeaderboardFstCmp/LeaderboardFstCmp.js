import styles from './css/styles.module.css';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'

export default function EventsFirstSec() {
    return(
        <div>
            <div className={styles.ImgContainer}>
                <img src="/Results.png" 
                alt=""
                className={styles.img}    
                />
                <div className={styles.imgOverlay} /> 
                <Particles height='40vw' zIndex='4' />
                <div className={styles.textContainer}>
                    <div className={styles.heading}>
                    RESULTADOS
                    </div>
                </div>
            </div>
            
        </div>
    )
}