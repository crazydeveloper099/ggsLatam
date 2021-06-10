import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IS_DEV, DEV_URL, PROD_URL, STATIC_CHALLENGE, MINECRAFT, TOURNAMENTS} from '../../../Constants/Constants.js';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import styles from '../../Signup/SignupRightContent/css/style.module.css'
import Router from 'next/router';

export default function VerifyUserDialog(props){

    const[code, setCode]=useState('');
    const[error, setError]=useState(false);
    const[buttonLoading, setButtonLoading]=useState(false);
    const[verified,setVerified]=useState(false)
    const URL=IS_DEV?DEV_URL:PROD_URL;
    useEffect(()=>{
        if(code!='' && code.length<6){
            setError(true)
        }
        else if(code.length>6){
            setError(true)
        }
        else{
            setError(false)
        }
    },[code])

    const resendCode=()=>{
        const data={"email":props.email, code:null}
        axios.post(URL+'/resendCode',data).then(res=>{
            if(res.status==200){
                console.log(res);
                if(res.data.status=="error"){
                    props.setSnackError(true)
                    props.setOpenSnack(true)
                }
                if(res.data.status=="success"){
                    props.setSnackError(false)
                    props.setOpenSnack(true)
                }
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const submitCode=()=>{
        if(code.length===6){ 
            setButtonLoading(true)
        const data={"email":props.email, code}
        axios.post(URL+'/verifyCode',data).then(res=>{
            if(res.status==200){
                if(res.data.status=="error"){
                    setError(true)
                    setButtonLoading(false)
                }
                if(res.data.status=="success"){
                    setButtonLoading(false)
                    setVerified(true)
                    localStorage.setItem('authType', 'Self');
                    localStorage.setItem('email',props.email);
                    Router.push('/')
                }
            }
        }).catch(err=>{
            console.log(err);
            setButtonLoading(false)
        })
        }
        else{
            setButtonLoading(false)
            setError(true);
        }
    }

    useEffect(()=>{
        if(props.sendCode){
            resendCode();
        }
    },[ props.sendCode])

    return(
        <Dialog open={props.open}>
                    <DialogTitle>
                    <div className={styles.heading} style={{textAlign:'center'}}>
                    Correo de verificación
                    </div> 
                    </DialogTitle>
                    <DialogContent>
                    <div className={styles.contentCodeContainer}>
                        <div className={styles.keyValContainer}>
                        <div>
                            <TextField 
                            id="outlined-basic" 
                            label="Código de verificación" 
                            value={code}
                            type="number"
                            error={error}
                            helperText={error?
                            'Código de verificación inválido'
                            :null}
                            inputProps={{ maxLength: 6 }}
                            onChange={(e)=>setCode(e.target.value)}
                            variant="outlined" />
                            </div>
                            <div style={{textAlign:'center', 
                            marginTop:'2vh',
                            marginBottom:'5vh',
                            width:'100%'}}>
                            <LoadingButton 
                            variant='contained' 
                            size="large" 
                            color="primary"
                            disabled={error || verified} 
                            onClick={submitCode}
                            loading={buttonLoading}
                        
                            >{verified?'Cambiar contraseña':'CONFIRMAR'}</LoadingButton>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <a className={styles.resendCode} onClick={resendCode}>
                                ¿No recibiste tu código? Haz click para reenviar
                                </a>
                            </div>
                        </div>
                    </div>
                       
                    </DialogContent>
                </Dialog>
    );
}