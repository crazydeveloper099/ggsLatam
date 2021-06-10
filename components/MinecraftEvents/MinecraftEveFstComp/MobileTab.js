import styles from './css/styles.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
export default function MobileTab(props){
    return(
        <div>
            <div className={styles.modalPcContainer}>
          <img src="/mobileUpdatedMinecraft.jpg" className={styles.imgShadow} alt="" />
            <div className={styles.titlePCMobileDialog}  
            style={{color:'white',fontFamily:'avenir'}}>Móvil / Bedrock:</div>

<p>Para acceder a nuestra network desde PC (Versión Java) deberás dirigirte al aparado "Multijugador", y agregar un servidor utilizando los siguientes datos:            </p>
           
            <div className={styles.heading} 
                style={{textAlign:'center'}}>
                <span>Dirección IP:</span> 
                
                <CopyToClipboard text='ggslatam.mcserver.us'>
                    <MDBIcon onClick={()=>props.setOpen(true)} style={{cursor:'pointer', marginLeft:'0.5vw'}} icon="clone" />
                </CopyToClipboard>
            </div>
            <div className={styles.code}>
            ggslatam.mcserver.us   
            </div>
            <div className={styles.heading} 
                style={{textAlign:'center'}}>
                <span>Puerto:</span> 
                
                <CopyToClipboard text='25565'>
                    <MDBIcon onClick={()=>props.setOpen(true)} style={{cursor:'pointer', marginLeft:'0.5vw'}} icon="clone" />
                </CopyToClipboard>
            </div>
                            
            <div className={styles.code}>
            25565   
            </div>
         
          </div>
        </div>
    )
}