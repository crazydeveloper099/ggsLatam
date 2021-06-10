import styles from './css/style.module.css' 
import Link from 'next/link';

export default function LoginLeftImage(){
    return (
        <div className={styles.container}>
        
        <img className={styles.img} src="/Login.png"  alt=""/>
        
        
        
        <div className={styles.contentContainer}>
            <div className={styles.contentHeading1}>Bienvenidos a</div>
           
            <div className={styles.contentHeading2}>Good Games Latam</div>
           


            <div className={styles.contentText}>
            Una plataforma donde encontrarás retos, torneos y sorteos en tus juegos 
favoritos todos los días con premios en objetos premium, gift cards, dinero 
real ¡y mucho más!
            </div>
            <br />
           <p className={styles.contentText}>
           Únete ya y se parte de la mejor comunidad gamers en Latinoamérica.
           </p>
            <Link href="/register">
            <button className={styles.button}>
            REGÍSTRATE</button>
            </Link>
        </div>
        </div>
    )
}