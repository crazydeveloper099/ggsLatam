import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './css/styles.module.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Snackbar from '@material-ui/core/Snackbar';
import {useState, useEffect} from 'react';
import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Iframe from 'react-iframe'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PasswordDialog(props) {
    const [open, setOpen] = useState(false);
    console.log(props);
    return(
        <>
            <Dialog 
                PaperProps={{
                    style: {
                    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
                    },
                }}
                open={props.open} 
                onClose={()=> props.setValue(false)}>
                {!props.loading?
                    <>
                    <DialogTitle>
                    <div className={styles.value}>
                            <Iframe url={props.ytLinkTutorial}
                                width="100%"
                                height="100%"
                                
                                id="myId"
                                display="initial"
                                position="relative"
                                frameBorder={0}
                            />
                    </div>
                    
                    </DialogTitle>
                    <DialogContent>
                    <div className={styles.contentCodeContainer}>
                        <div className={styles.keyValContainer}>
                            
                            <div className={styles.heading} 
                                style={{textAlign:'center'}}>
                                <span>Lobby ID:</span> 
                                <CopyToClipboard text={JSON.parse(props.password)[0].key}>
                                    <MDBIcon onClick={()=>setOpen(true)} style={{cursor:'pointer', marginLeft:'0.5vw'}} icon="clone" />
                                </CopyToClipboard>
                            </div>
                            
                            <div className={styles.code}>
                                {JSON.parse(props.password)[0].key}     
                            </div>
                            
                            <div className={styles.heading} 
                            style={{textAlign:'center'}}>
                                <span>Lobby Password:</span> 
                                <CopyToClipboard text={JSON.parse(props.password)[0].value}>
                                    <MDBIcon onClick={()=>setOpen(true)} style={{cursor:'pointer', marginLeft:'0.5vw'}} icon="clone" />
                                </CopyToClipboard>
                            </div>
                            <div className={styles.code}>
                                {JSON.parse(props.password)[0].value}  
                            </div>
                        </div>
                    </div>
                       
                    </DialogContent>
                    </>:
                    <div className={styles.loadingContainer}>
                        <CircularProgress color="inherit" />
                    </div>
                }
                </Dialog>
                <Snackbar
               anchorOrigin={{
                   vertical:'bottom',
                   horizontal:'left'
                }}
                open={open}
                onClose={()=>setOpen(false)}
                message="Copied!"
            />
           </> 
    )
}