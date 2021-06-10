import styles from './css/style.module.css' 
import {useState, useEffect} from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Tooltip from '@material-ui/core/Tooltip';
import { MDBInput } from "mdbreact";
import { MDBContainer } from 'mdbreact'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Router from 'next/router';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import isEmail from 'validator/lib/isEmail';
import { DEV_URL, IS_DEV, PROD_URL } from '../../../Constants/Constants';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';

import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
import VerifyUserDialog from '../../Dialog/VerifyUser/VerifyUserDialog';

export default function LoginRightContent(props){

    const[open, setOpen]=useState(false);

    const URL=IS_DEV?DEV_URL:PROD_URL;


    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [emailError, setEmailError]=useState(false)
    const [passError, setPassError]=useState(false)
    const [loginError, setLoginError]=useState(null)
    
    const [resetPassEmail, setResetPasswordEmail]=useState('')
    const [resetPassEmailError, setResetPasswordEmailError]=useState(false)

    const [code, setCode]=useState('')
    const [resetNotCodeSent, setResetNotCodeSent]=useState(true)
    const [codeError, setCodeError]=useState(false)
    const [passwordReset, setPasswordReset]=useState('')
    const [errorPasswordReset, setErrorPasswordReset]=useState(false)
    const [fgtPassLoading, setFgtPassLoading]=useState(false)
    const [fgtPassVerified, setFgtPassVerified]=useState(false)
    const[errorCodeSending, setErrorCodeSending]=useState(false);
   const [openSnack,setOpenSnack]=useState(false);
    const [verifiedUser, setVerifiedUser]=useState(true);
    const [openVerifyDialog, setOpenVerifyDialog]=useState(false);
    const [snackError, setSnackError]=useState(false);
    const [sendVerifyCode, setSendVerifyCode]=useState(false);

    // const [isTokenFound, setTokenFound] = useState(false);
    // getToken(setTokenFound);
    
    useEffect(() => {
        let authType=localStorage.getItem('authType')
        let email=localStorage.getItem('email')
        if(authType && email){
            Router.push('/events');
        }
    }, [])
    
    const openResetDialog=(e)=>{
        e.preventDefault();
        setOpen(true)
    }

    const submitEmail=()=>{
        if(resetPassEmail.length==0 || !isEmail(resetPassEmail))
        {
            setResetPasswordEmailError(true)
        }
        else{
            setFgtPassLoading(true)
            axios.post(`${URL}/resetPassword`, { "email":resetPassEmail })
            .then(res => {
                if(res.data.status=='success'){
                    setFgtPassLoading(false)
                    setResetNotCodeSent(false)
                }
                else{
                    setFgtPassLoading(false)
                    setOpenSnack(true)
                    setErrorCodeSending(true)
                }
            })
        }
    }
    useEffect(()=>{
        if(isEmail(resetPassEmail) && resetPassEmailError){
            setResetPasswordEmailError(false)
        }
        else if(resetPassEmail.length>0 && !isEmail(resetPassEmail) && !resetPassEmailError){
            setResetPasswordEmailError(true)
        }
    },[resetPassEmail])

    const resendCode=()=>{
        axios.post(`${URL}/resetPassword`, { "email":resetPassEmail })
            .then(res => {
                if(res.data.status=='success'){
                    setFgtPassLoading(false)
                    setResetNotCodeSent(false)
                    setErrorCodeSending(false)
                    setOpenSnack(true)
                }
                else{
                    setFgtPassLoading(false)
                    setOpenSnack(true)
                    setErrorCodeSending(true)
                }
        })
    }

    const submitPassCode=()=>{
        if(code==null || code==undefined || code.length==0){
            setCodeError(true);
        }
        else if(passwordReset==null || passwordReset==undefined || passwordReset<6){
            setErrorPasswordReset(true)
        }
        else{
            setFgtPassLoading(true)
            setCodeError(false);
            setErrorPasswordReset(false)
            const data={
                "email":resetPassEmail,
                "code":code,
                "password":passwordReset
            }
            axios.post(`${URL}/newPassword`, data)
            .then(res => {
                if(res.data.status=='success'){
                   setFgtPassVerified(true)  
                   setFgtPassLoading(false)
                }
                else{
                    setFgtPassLoading(false)
                }
        })
        }
    }

    const getTokenLocal=(response,signupMethod)=>{
            signupMethod(response, null);
    }

    const responseFacebook = (response, token) => {
        if('accessToken' in response){
            props.setLoadingTextValue('Connecting To Facebook..')

            let dataObj={
                'authType':'Facebook',
                'profile':{
                    'email':response.email,
                    'name':response.name,
                    'image':response.picture.data,
                    'password':null,
                    'token':token
                }
            }            

            axios.post(`${URL}/getLoginDetails/`, { dataObj })
            .then(res => {
                if(res.data.status=='success' && res.data.saved){
                    
                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'LOGIN', {authType: "Facebook", mail:response.email });
                        }
                    }

                    localStorage.setItem('authType', 'Facebook');
                    localStorage.setItem('email',response.email);
                    if(localStorage.getItem('redirectPage')!=null){
                        Router.push(localStorage.getItem('redirectPage'))
                        localStorage.removeItem('redirectPage')
                        props.setLoadingValue(false)
                    }
                    else{
                        Router.push('/events')
                        props.setLoadingValue(false)
                    }
                }
                else{
                    props.setLoadingValue(false)
                    console.log(res);
                }
            })
            .catch(err=>{
                props.setLoadingValue(false)
                console.log(err);
            })
        }
    }


    const responseGoogle = (response) => {
        
        if('accessToken' in response){

            props.setLoadingTextValue('Connecting To Google..')
            props.setLoadingValue(true)
            let dataObj={
                'authType':'Google',
                'profile':{
                    'email':response.profileObj.email,
                    'name':response.profileObj.name,
                    'image':response.profileObj.imageUrl,
                    'password':null,
                    'token':null
                }
            }
            axios.post(`${URL}/getLoginDetails/`, { dataObj })
            .then(res => {
                if(res.data.status=='success' && res.data.saved){

                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'LOGIN', {authType: "Google", mail:response.profileObj.email });
                        }
                    }


                    localStorage.setItem('authType', 'Google');
                    localStorage.setItem('email',response.profileObj.email);
                    if(localStorage.getItem('redirectPage')!=null){
                        Router.push(localStorage.getItem('redirectPage'))
                        localStorage.removeItem('redirectPage')
                        props.setLoadingValue(false)
                    }
                    else{
                        Router.push('/events')
                        props.setLoadingValue(false)
                    }
                }
                else{
                    props.setLoadingValue(false)
                    console.log(res);
                }
            })
            .catch(err=>{
                props.setLoadingValue(false)
                console.log(err);
            })
        }
    }

    const responseNativeAuth=(response, token)=>{
        setLoginError('')
        if(email.length==0 || !isEmail(email))
        {
            setEmailError(true)
        }
        if(password.length<6)
        {
            setPassError(true)
        }
        else{
            setEmailError(false)
            setPassError(false)
            props.setLoadingTextValue('Logging you in...')
            let dataObj={
                'authType':'Self',
                'profile':{
                    'email':email,
                    'name':null,
                    'image':null,
                    'password':password,
                    'token':token
                }
            }
            axios.post(`${URL}/getLoginDetails/`, { dataObj })
            .then(res => {
                if(res.data.status=='success' && res.data.saved){
                  
                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'LOGIN', {authType: "Self", mail:email });
                        }
                    }

                    localStorage.setItem('authType', 'Self');
                    localStorage.setItem('email',email);
                    if(localStorage.getItem('redirectPage')!=null){
                        Router.push(localStorage.getItem('redirectPage'))
                        localStorage.removeItem('redirectPage')
                          props.setLoadingValue(false)
                    }
                    else{
                        Router.push('/events')
                        props.setLoadingValue(false)
                    }
                }
                else{
                    if('msg' in res.data 
                    && 'code' in res.data.msg 
                    && res.data.msg.code =="UserNotConfirmedException")
                    {
                    setVerifiedUser(false)    
                    props.setLoadingValue(false)
                    let errMsg=typeof res.data.msg === 'string'?res.data.msg:res.data.msg.message
                    setLoginError(errMsg)
                    }
                    else{
                    props.setLoadingValue(false)
                    let errMsg=typeof res.data.msg === 'string'?res.data.msg:res.data.msg.message
                    setLoginError(errMsg)
                    }
                }
            })
            .catch(err=>{
                props.setLoadingValue(false)
                setLoginError('Something went wrong, please try again!')
            })
        }
    }

    return (
        <div className={styles.container}>
        <Dialog 
                open={open} 
                onClose={()=>setOpen(false)}
                >
                    <DialogTitle>
                    <div className={styles.heading} style={{textAlign:'center'}}>
                    Correo de verificación
                    </div> 
                    </DialogTitle>
                    <DialogContent>
                    <div className={styles.contentCodeContainer}>
                        <div className={styles.keyValContainer}>
                        <div>
                            <div style={{textAlign:'center'}}>
                            <TextField 
                            id="outlined-basic" 
                            label="Correo electrónico" 
                            value={resetPassEmail}
                            className={resetNotCodeSent?styles.fadeIn:styles.fadeOut}
                            error={resetPassEmailError}
                            helperText={resetPassEmailError?
                            'Email inválido'
                            :null}
                            onChange={(e)=>setResetPasswordEmail(e.target.value)}
                            variant="outlined" />
                            </div>

                            <div style={{textAlign:'center'}}>
                             <TextField 
                            id="outlined-basic" 
                            label="Código de verificación" 
                            value={code}
                            disabled={resetNotCodeSent || fgtPassLoading || fgtPassVerified}
                            type="number"
                            className={resetNotCodeSent?styles.fadeOut:styles.fadeIn}
                            error={codeError}
                            helperText={codeError?
                            'Código de verificación inválido'
                            :null}
                            inputProps={{ maxLength: 6 }}
                            onChange={(e)=>setCode(e.target.value)}
                            variant="outlined" />
                            </div>
                            <div style={{textAlign:'center',marginTop:'5vh'}}>
                             <TextField 
                            disabled={resetNotCodeSent || fgtPassLoading || fgtPassVerified}
                            id="outlined-basic" 
                            label="Nueva Contraseña" 
                            value={passwordReset}
                            className={resetNotCodeSent?styles.fadeOut:styles.fadeIn}
                            type='password'
                            error={errorPasswordReset}
                            onChange={(e)=>setPasswordReset(e.target.value)}
                            helperText={errorPasswordReset?
                            'Contraseña invalido!'
                            :null}
                            variant="outlined" />
                            </div>
                            </div>
                            <div style={{textAlign:'center', 
                            marginTop:'2vh',
                            marginBottom:'5vh',
                            width:'100%'}}>
                            <LoadingButton 
                            variant='contained' 
                            size="large" 
                            color="primary"
                            
                            disabled=
                            {resetPassEmailError }

                            onClick={
                                fgtPassVerified?
                                ()=>setOpen(false)
                                :
                                resetNotCodeSent?
                                submitEmail:submitPassCode}
                            loading={fgtPassLoading}
                        
                            >{fgtPassVerified?'Cambiar contraseña':'Confirmar'}</LoadingButton>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <a className={styles.resendCode} onClick={resendCode}
                        disabled={fgtPassLoading || fgtPassVerified}>
                                ¿No recibiste tu código? Haz click para reenviar
                                </a>
                            </div>
                        </div>
                    </div>
                       
                    </DialogContent>
                </Dialog>
                <VerifyUserDialog  
                    email={email} 
                    open={openVerifyDialog}
                    setOpen={setOpenVerifyDialog} 
                    setOpenSnack={setOpenSnack}
                    setSnackError={setSnackError}
                    isLogin={true}
                    sendCode={sendVerifyCode}
                    />

           
            <div className={styles.mainContent}>
                <img src="/ggsLogoNoBg.png" className={styles.ggsLogo} />
                <div className={styles.loginHeading}>INICIA SESIÓN</div>
                <div className={styles.loginSubHeading}>Ingresa tus datos 
                de acceso para iniciar sesión</div>

               <MDBContainer>
                
                <div className={styles.input}>
                <MDBInput className="w-100" label="Correo electrónico" size='lg' icon='envelope'
                onChange={e =>setEmail(e.target.value)}  
                 >
                 {emailError?<div style={{color: "red", fontStyle:'italic', fontWeight:'bolder'}}>
                  Email inválido!
                  </div>:null}
                 </MDBInput>
                </div>
                
                <div className={styles.input}>
                <MDBInput 
                className="w-100" 
                label="Contraseña" 
                size='lg' 
                icon='lock' 
                type="password" 
                validate 
                onChange={e=>setPassword(e.target.value)}
                 >{passError?<div style={{color: "red", fontStyle:'italic', fontWeight:'bolder'}}>
                  La contraseña debe tener al menos 6 caracteres
                  </div>:null}
                 </MDBInput>
                </div>
               
                <div className={styles.forgetPass}>
                
                <a onClick={e=>openResetDialog(e)}>
                Olvidé mi contraseña
                </a>
                </div>
               
                </MDBContainer>
                <button className={styles.button} onClick={()=>{getTokenLocal(null,responseNativeAuth)}}>
                Iniciar sesión
                </button>
                {loginError!=null?<div style={{color: "red", marginTop:'5px' , fontWeight:'bolder'}}>
                {loginError}
                </div>:null}
                {!verifiedUser?
                <div style={{textAlign: 'center'}}>
                                <a className={styles.verifyAccount} onClick={()=>{
                                    setOpenVerifyDialog(true);
                                    setSendVerifyCode(true);
                                }}
                        disabled={fgtPassLoading || fgtPassVerified}>
                                Verify Account
                                </a>
                            </div>
                            :
                            null
                }            


                <div className={styles.oauthHeading}>O inicia sesión con:</div>
                <div className={styles.sameLine}>
                <GoogleLogin
                    clientId="37761562383-b09bv709vu4rj6eiuki0qs7ue7lt98hg.apps.googleusercontent.com"
                    render={renderProps => (
                        <Tooltip title="Google">
                        <a href="" onClick={renderProps.onClick}>
                            <div className={styles.oauthCircle}>
                                <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                            </div>
                        </a>
                    </Tooltip>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    >
                    </GoogleLogin>
                   
                   
                    <FacebookLogin
                        appId="476817800321066"
                        callback={(response)=>{getTokenLocal(response,responseFacebook)}}
                        fields="name,email,picture"
                        render={renderProps => (
                            <Tooltip title="Facebook">
                            <a href="#" onClick={renderProps.onClick}>
                            <div className={styles.oauthCircle}>
                            <img src="https://img.icons8.com/color/48/000000/facebook-f.png"/>
                            </div>
                        </a>
                        </Tooltip>
                        )}
                    />
                </div>
            </div>
            <Snackbar
                 anchorOrigin={{
                     vertical:'bottom',
                     horizontal:'left'
                  }}
                  open={openSnack}
                  onClose={()=>setOpenSnack(false)}
                  message={
                    errorCodeSending?'Ypu have reached the limit':
                    "Código enviado correctamente"}
              />
        </div>
    )
}