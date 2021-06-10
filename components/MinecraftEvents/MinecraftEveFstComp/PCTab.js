import styles from './css/styles.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

export default function PCTab(props){
    return(
        <div>
            <div className={styles.modalPcContainer}>
          <img src="pcjoin.gif" className={styles.imgShadow} alt="" />
            <div className={styles.titlePCMobileDialog} 
            style={{color:'white',fontFamily:'avenir'}} >Jugar en PC (Java)</div>

<p style={{color:'white'}}>
            Para acceder a nuestra network desde PC (Versión Java) deberás dirigirte al aparado "Jugar", y agregar un servidor en "Servidores" utilizando la dirección
            </p>

            <div className={styles.heading} 
                style={{textAlign:'center'}}>
                <span>IP:</span> 
                <CopyToClipboard text='mc.ggslatam.gg'>
                    <MDBIcon onClick={()=>props.setOpen(true)} style={{cursor:'pointer', marginLeft:'0.5vw'}} icon="clone" />
                </CopyToClipboard>
            </div>
                            
            <div className={styles.code}>
            mc.ggslatam.gg     
            </div>
           
            
          </div>

         
        </div>
    )
}