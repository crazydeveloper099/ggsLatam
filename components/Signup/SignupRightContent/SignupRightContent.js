import styles from './css/style.module.css' 
import Link from 'next/link';
import {useState, useEffect} from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import { MDBInput } from "mdbreact";
import { MDBContainer } from 'mdbreact'
import Tooltip from '@material-ui/core/Tooltip';
import Router from 'next/router';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IS_DEV, DEV_URL, PROD_URL, STATIC_CHALLENGE, MINECRAFT, TOURNAMENTS} from '../../../Constants/Constants.js';
import Snackbar from '@material-ui/core/Snackbar';
import VerifyUserDialog from '../../Dialog/VerifyUser/VerifyUserDialog';

export default function LoginRightContent(props){

    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password1, setPassword1]=useState('')
    const [password2, setPassword2]=useState('')

    const [nameError, setNameError]=useState(false)
    const [emailError, setEmailError]=useState(false)
    const [pass1Error, setPass1Error]=useState(null)
    const [pass2Error, setPass2Error]=useState(null)
    const [signupError, setSignupError]=useState(null)
    const[open, setOpen]=useState(false);
    
    const [openSnack,setOpenSnack]=useState(false);
    const [snackError, setSnackError]=useState(false);
    const URL=IS_DEV?DEV_URL:PROD_URL;


    const getTokenLocal=(response,signupMethod)=>{
        signupMethod(response, null);
    }
   

    useEffect(() => {
        let authType=localStorage.getItem('authType')
        let email=localStorage.getItem('email')
        console.log(authType, email);
        if(authType && email){
            Router.push('/events');
        }
    }, [])
    
 
    const responseFacebook = (response,token) => {
        window.scrollTo(0, 0)
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
                          window.fbq('track', 'REGISTER', {authType: "Facebook", mail:response.email });
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

    const responseGoogle = (response,token) => {
        window.scrollTo(0, 0)
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
                    'token':token
                }
            }
            axios.post(`${URL}/getLoginDetails/`, { dataObj })
            .then(res => {
                if(res.data.status=='success' && res.data.saved){
                    
                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'REGISTER', {authType: "Google", mail:response.profileObj.email });
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


    const responseNativeAuth=(response,token)=>{
       
        setSignupError('');
        // if(name.length==0 || phone.length<10 || email.length==0 || 
        //     !isEmail(email) || password1!=password2 || 
        //     password1.length<0 || password2.length<0){
                if(name.length==0)setNameError(true);
                else if(email.length==0 || !isEmail(email))setEmailError(true);
                else if(password1.length==0)setPass1Error("La contraseña debe tener al menos 6 caracteres");
                else if(password2.length==0)setPass2Error("La contraseña debe tener al menos 6 caracteres");
                else if(password1!=password2){
                    setPass1Error("Las contraseñas no coinciden ");
                    setPass2Error("Las contraseñas no coinciden ");
                }
                
            // }

        else{
            setNameError(false)
            setEmailError(false)
            setPass1Error(null)
            setPass2Error(null)
            props.setLoadingTextValue('Signing you up...')
            let dataObj={
                'authType':'Self',
                'profile':{
                    'email':email,
                    'name':name,
                    'image':null,
                    'password':password1,
                    'token':token
                }
            }
            axios.post(`${URL}/getSignupDetails/`, { dataObj })
            .then(res => {
                if(res.data.status=='success' && res.data.saved){

                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'REGISTER', {authType: "Self", mail:email });
                        }
                      }

                    props.setLoadingValue(false)
                    setOpen(true);
                    setOpenSnack(true);
                }
                else{
                    console.log(res.data);
                    props.setLoadingValue(false)
                    let errMsg=typeof res.data.msg === 'string'?res.data.msg:res.data.msg.message
                    setSignupError(errMsg)
                  
                }
            })
            .catch(err=>{
                console.log(err);
                props.setLoadingValue(false)
                setSignupError('Something went wrong, please try again!')
            })
        }
    }



    return (
        
        <div className={styles.container} >
        
            <VerifyUserDialog  
            email={email} 
            open={open}
            setOpen={setOpen} 
            setOpenSnack={setOpenSnack}
            setSnackError={setSnackError}
            isLogin={false}
            sendCode={false}
            />
          
            <div className={styles.mainContent}>
            <img src="/ggsLogoNoBg.png" className={styles.ggsLogo} />
                
            
                <div className={styles.loginHeading}>Registrarse</div>
                <div className={styles.loginSubHeading}>
                    Ingresa tus datos para crear una cuenta
                </div>
                <MDBContainer>
                <div className={styles.input}>
                
                <MDBInput className="w-100 p-3" label="Tu nombre completo" size='lg' icon='user' 
                onChange={e =>setName(e.target.value)}   >
                {nameError?<div style={{color: "red",  fontWeight:'bolder'}}>
                Este campo no puede estar vacío
                </div>:null}
                </MDBInput>

                </div>
                {/* <div className={styles.input}>
                
                <MDBInput className="w-100 p-3" label="Nombre de usuario" size='lg' icon='phone' 
                 onChange={e =>setPhone(e.target.value)}  >
                {phoneError!=null?<div style={{color: "red",  fontWeight:'bolder'}}>
                    {phoneError}
                </div>:null}
                </MDBInput>
                
                </div> */}
                <div className={styles.input}>
                
                <MDBInput className="w-100 p-3" label="Correo electrónico" size='lg' icon='envelope'
                 onChange={e =>setEmail(e.target.value)}  >
                {emailError?<div style={{color: "red",  fontWeight:'bolder'}}>
                Debes introducir tu correo electrónico 
                </div>:null}
                </MDBInput>
               
                </div>
                <div className={styles.input}>
                
                <MDBInput className="w-100 p-3" label="Contraseña" size='lg' icon='lock' type="password" validate 
                 onChange={e =>setPassword1(e.target.value)} >
                {pass1Error!=null?<div style={{color: "red",  fontWeight:'bolder'}}>
                  {pass1Error}
                </div>:null}
                </MDBInput>
                
                </div>
                <div className={styles.input}>
                
                <MDBInput className="w-100 p-3" label="Repita la contraseña" size='lg' icon='lock' type="password" validate
                 onChange={e =>setPassword2(e.target.value)} >
                {pass2Error!=null?<div style={{color: "red",  fontWeight:'bolder'}}>
                  {pass2Error}
                </div>:null}
                </MDBInput>
                
                </div>
               
               
                </MDBContainer>
                <button className={styles.button} onClick={()=>getTokenLocal(null,responseNativeAuth)}>Registrarse</button>
                {signupError!=null?<div style={{color: "red", marginTop:'5px' , fontWeight:'bolder'}}>
                {signupError}
                </div>:null}
                <div className={styles.oauthHeading}>O crea tu cuenta con:</div>
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
                    snackError?'You have reached the limit':
                    "Código enviado correctamente"}
              />
        </div>
    )
}