import styles from './css/styles.module.css';
import {MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useEffect, useState } from 'react';
export default function Footer() {
  const[isLoggedIn,setIsLoggedIn]=useState(false)
  
  useEffect(() => {
    localStorage.getItem('authType')&& localStorage.getItem('email')?
    setIsLoggedIn(true):setIsLoggedIn(false);
  },[])

  const facebookRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'CONTACT', {type: 'Facebook',element:'Footer' });
        window.open('https://www.facebook.com/ggslatam', '_blank');
      }
    }
  }

  const instagramRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'CONTACT', {type: 'Instagram',element:'Footer' });
        window.open('https://www.instagram.com/ggslatam/', '_blank');
      }
    }
  }

  const twitchRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'CONTACT', {type: 'Twitch',element:'Footer' });
        window.open('https://www.twitch.tv/ggslatam', '_blank');
      }
    }
  }

  const twitterRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'CONTACT', {type: 'Twitter',element:'Footer' });
        window.open('https://twitter.com/ggslatam', '_blank');
      }
    }
  }

  const discordRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'CONTACT', {type: 'Discord',element:'Footer' });
        window.open('https://jo.my/ggsdiscord', '_blank');
      }
    }
  }



  return (
    <div className={styles.Container}>
        <div className={styles.widthFooterSec}>
             <div className={styles.titleText}>Nosotros</div>
                <div className={styles.footerPara}>
                Good Games Latam es una organización fundada con el propósito de 
traerle nuevas experiencias a los gamers. Nuestros esfuerzos están 
destinados a forjar un espacio en donde jugadores de todo el mundo 
puedan ganar premios jugando, compitiendo ¡o simplemente relajándose! 
Todos los miembros de la organización somos apasionados del gaming y 
estamos comprometidos a brindarles una experiencia óptima y la mayor 
cantidad de beneficios posibles a nuestros usuarios ¿Estás listo para ser 
parte de la comunidad?
                </div>
        </div>
        <div className={styles.links} >
             <div className={styles.titleText}>Explora</div>
             {
              !isLoggedIn ?
             <a href='/' className={styles.footerAnchor}>Inicio</a>:null
             }
             <a href="/events" className={styles.footerAnchor}>Eventos</a>
             <a href="/minecraft" className={styles.footerAnchor}>Minecraft</a>
             {
              isLoggedIn ?
              <>
             <a href='/profile' className={styles.footerAnchor}>Mi Perfil</a>
             <a href='/wallet' className={styles.footerAnchor}>Mi Billetera</a>
             </>
             :null
             }
             <a href="/about" className={styles.footerAnchor}>Nosotros</a>
             <a  onClick={discordRedirect}  className={styles.footerAnchor}>Contáctanos</a>
             {
              !isLoggedIn ?
              <>
             <a href="/login" className={styles.footerAnchor}>Inicia Sesión</a>
             <a href="/register" className={styles.footerAnchor}>Crea una cuenta</a>
             </>
             :
             null
             }

             
        </div>
        <div className={styles.links}>
            <div className={styles.titleText}>Síguenos en:</div>
            <div className={styles.sameLineFooterSM}>
                <a style={{color:'white'}} onClick={facebookRedirect} className={styles.footerAnchor} >
                <MDBIcon  fab icon="facebook" />
                </a>
                <a style={{color:'white'}} onClick={instagramRedirect} className={styles.footerAnchor} >
                <MDBIcon fab icon="instagram" />
                </a>
                <a style={{color:'white'}} onClick={twitchRedirect} className={styles.footerAnchor} >
                <MDBIcon fab icon="twitch" />
                </a>
                <a style={{color:'white'}} onClick={twitterRedirect} className={styles.footerAnchor} >
                <MDBIcon fab icon="twitter" /></a>
            </div>
        </div>
    </div>
  );
}