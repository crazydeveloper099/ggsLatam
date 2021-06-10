import styles from './css/style.module.css' 
import Link from 'next/link';
import Sticky from 'react-sticky-el';

export default function LoginLeftImage(){
    return (
        <div  style={{position:'fixed'}} className={styles.container}>
        <img className={styles.img}  src="/Signup.png" alt=""/>
       
        
        <div className={styles.contentContainer}>
            <div className={styles.contentHeading1}>Bienvenido a</div>
           
            <div className={styles.contentHeading2}>Good Games Latam</div>
           
            <div className={styles.contentText}>
            Una plataforma donde encontrarás retos, torneos y sorteos en tus juegos 
favoritos todos los días con premios en objetos premium, gift cards, dinero 
real ¡y mucho más!
            </div>
            <br />
            <p className={styles.contentText}>
            Únete ya y sé parte de la mejor comunidad de gamers en Latinoamérica.
            </p>
           
            <Link href="/login">
            <button className={styles.button}>
            INICIA SESIÓN</button>
            </Link>
        </div>
        </div>
    )
}