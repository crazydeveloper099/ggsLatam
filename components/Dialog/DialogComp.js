import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './css/styles.module.css'
import Button from '@material-ui/core/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Snackbar from '@material-ui/core/Snackbar';
import {useState, useEffect} from 'react';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {IS_DEV, DEV_URL, PROD_URL, STATIC_CHALLENGE, MINECRAFT, TOURNAMENTS, INPUT_ERR_MSG_PARTICIPATION} from '../../Constants/Constants.js';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Link from 'next/link';
import {useStyles} from './DialogStyles.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import FormData from 'form-data';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment-timezone';
import ReactGA from 'react-ga';

moment().format();

export default function DialogComp(props) {
    
    const [open, setOpen] = useState(false);
    const [isError, setIsError]= useState(false);
    const [value, setValue]= useState('');
    const [disabled, setDisabled]= useState(true);
    const [errorText, setErrorText]= useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess]= useState()
    const [email, setEmail]=useState(undefined)
    const [authType, setAuthType]=useState(undefined)
    const [isParticipated, setIsParticipated]=useState(false)
    const [isFileSelected, setIsFileSelected]=useState(false)
    const [screenshot, setScreenshot]=useState(null)
    const [screenshotError, setScreenshotError]=useState(false)
    const [scoreText, setScoreText]=useState('')
    const [scoreError, setScoreErrorText]=useState(false)
    const [isTournamentExpired, setIsTournamentExpired]=useState(false); 
    
    useEffect(() => {
        setValue(props.username)
    }, [props.username]);

    const Participate=()=>{
        if((scoreError==true || scoreText.length==0) && 
        (props.eventType==STATIC_CHALLENGE||
            props.eventType==MINECRAFT))
            {
                setScoreErrorText(true);
            }
        else if(!isFileSelected && screenshot==null && 
            (props.eventType==STATIC_CHALLENGE||
            props.eventType==MINECRAFT)){
                setScreenshotError(true);               
        }    
     
        else{

        setLoading(true);
        const URL=IS_DEV?DEV_URL:PROD_URL;
        const email=localStorage.getItem('email');
        const challengeID=props.challengeID;
        const eventType=props.eventType;
        let data = new FormData();
        screenshot!=null?data.append('file', screenshot):null;
        scoreText!==''?data.append('gameScore', scoreText):null;
        data.append('email',email)
        data.append('challengeID',challengeID);
        data.append('username',value);
        data.append('eventType',eventType)
        axios.post(URL+'/participate',data).then(res=>{
            if(res.status==200){
                if(res.data.status=="PARTICIPATED"){
                    setErrorText('El usuario ya está participando')
                    setIsParticipated(true)
                    setIsError(true)
                    setLoading(false)
                }
                if(res.data.status=="success"){
                    setIsSuccess(true)

                    if (typeof window !== "undefined") {
                        if (window.fbq != null) { 
                          window.fbq('track', 'PARTICIPATION', {url: window.location.href });
                        }
                        ReactGA.event({
                            category: 'User',
                            action: 'Participated',
                            label: 'URL-'+window.location.href
                          });
                    }
                }
            }
        }).catch(err=>{
            console.log(err);
            setLoading(false)
        })
      }
    }


    const checkFileUploaded=(e)=>{
        if(e.target.files.length>0){
            setIsFileSelected(true)
            setLoading(true)
            setScreenshot(e.target.files[0]);
        }
    }
    const closeDialog=()=>{
        setValue(props.username);
        setLoading(false);
        setIsSuccess(false);
        props.setValue(false)
    }
useEffect(() => {
    if(value!='' && value!=null && value!=undefined){
    if(value.length>3){
        setIsError(false)
        setDisabled(false)
        setErrorText(null)
    }
    else{
        setIsError(true)
        setDisabled(true)
        setErrorText(INPUT_ERR_MSG_PARTICIPATION)
    }
}
}, [value]);
useEffect(()=>{
    if(scoreText!='' && 
    scoreText!=null && 
    scoreText!=undefined && 
    scoreText.length>0){
        setScoreErrorText(false);
    }
},[scoreText])

useEffect(()=>{
    if(screenshot!=null){
        setLoading(false);
        setScreenshotError(false);
    }
},[screenshot])

useEffect(() => {
    setEmail(localStorage.getItem('email'));
    setAuthType(localStorage.getItem('authType'));

    if(props.eventType==TOURNAMENTS){
    
            let utcNow=new Date(moment.tz(new Date(), "GMT")
                            .utcOffset(-300)
                            .format("MM/DD/YYYY hh:mm:ss a"))
                            .getTime()
        
            if(new Date(props.time).getTime() - utcNow<=0){
                setLoading(true)
                setIsTournamentExpired(true)
            }
    }

}, []);

    const classes = useStyles();

    return(
        <div>
        <Dialog 
                PaperProps={{
                    style: {
                    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
                    },
                }}
                open={props.open} 
                onClose={closeDialog}>
                {!props.loading?
                    <>
                    <DialogTitle>
                        <div className={styles.logoContainer}>
                        <div className={styles.heading}>{props.title}  </div>

                        <img src={props.logo} className={styles.logo} alt=""/>
                        {email&&authType?
                        <div className={styles.contentCodeContainer}>
                        <div className={styles.keyValContainer}>
                            <div className={styles.heading} 
                            style={{textAlign:'center'}}>
                                Para participar, por favor ingresa tu nombre dentro del juego
                            </div>
                            
                            <div className={styles.value} style={{textAlign:'center'}}>
                               <TextField
                                    style={{width:'80%'}}
                                    className={classes.root}
                                    error={isError}
                                    value={value}
                                    onChange={(e)=>setValue(e.target.value)}
                                    id="outlined-error-helper-text"
                                    label="NOMBRE DENTRO DEL JUEGO"
                                    helperText={isError?errorText:null}
                                    variant="outlined"
                                    disabled={email==undefined&&authType==undefined || loading}
                                />
                            </div>
                           
                        </div>
                    </div>
                    :null}
                    {props.eventType==STATIC_CHALLENGE||
                            props.eventType==MINECRAFT?
                        <>
                            <div className={styles.keyValContainer}>
                            
                            
                            <div className={styles.value} style={{textAlign:'center'}}>
                               <TextField
                                    style={{width:'80%'}}
                                    className={classes.root}
                                    error={scoreError}
                                    value={scoreText}
                                    type="number"
                                    onChange={(e)=>setScoreText(e.target.value)}
                                    id="outlined-error-helper-text"
                                    label="Puntaje"
                                    helperText={scoreError?
                                        INPUT_ERR_MSG_PARTICIPATION:null}
                                    variant="outlined"
                                    disabled={email==undefined&&authType==undefined || loading}
                                />
                            </div>
                        </div>    

                    <div className={styles.contentCodeContainer}>
                    
                        <div className={styles.keyValContainer}>
                            <div className={styles.heading} 
                            style={{textAlign:'center'}}>
                                Captura de pantalla&nbsp;
                                <Tooltip placement="right-start"
                                title="Sube una captura de pantalla que demuestre el puntaje declarado">
                                    <Button style={{outline:'none'}}>
                                    <MDBIcon style={{color:'white'}} 
                                    icon="question-circle" />
                                    </Button>
                                </Tooltip>
                                
                            </div>
                            
                            <div className={styles.value} style={{textAlign:'center'}}>
                            <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            disabled={loading}
                            onChange={(e)=>checkFileUploaded(e)}
                            />
                            <label htmlFor="raised-button-file">
                            <Button disabled={loading} variant='contained' component="span" 
                            style={{textTransform:'none', backgroundColor:'white',
                            color:'purple',fontFamily:'avenir'}}>
                                Subir captura de puntuaciones
                                
                            </Button>
                            </label> 
                            {screenshotError?<div style={{color:'tomato'}}>
                            ENTRADA INVÁLIDA</div>:null}
                            </div>
                        </div>
                        </div>
                        </>
                        
                        :null}
                        <div>  
                        {props.isBattlefy?
                        
                        <>
                        {!isTournamentExpired?
                            !isSuccess && !isParticipated?
                        email&&authType?

                        <LoadingButton 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            style={{borderColor:isError?"gray":'white', color:isError?"gray":'white'}}
                            loading={loading}
                            onClick={Participate}
                            disabled={disabled}>
                            enviar&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
                        </LoadingButton>:
                        <div style={{marginTop:'2vh', textAlign:'center'}}>
                        <div >
                        <Link href='/login'>
                        <a>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            style={{width:'100%'}} >
                            Iniciar sesión&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
                        </Button>
                        </a>
                        </Link>
                        </div>
                        <div style={{marginTop:'2vh'}}>
                        <Link href='/register' >
                        <a>
                        <Button 
                            variant="contained" 
                            color='secondary' 
                            size="large" style={{background:'#FF00FF',width:'100%'}} >
                            REGÍSTRATE&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
                        </Button>
                        </a>
                        </Link>
                        </div>
                        </div>
                        :
                        <>
                            <div className={styles.warning}>
                            ¡Recuerda realizar Check-in 1 hora antes de que empiece el torneo para confirmar tu registro!
                            </div>
                            <div style={{textAlign:'center'}}>
                            <a target="_blank" href={props.battlefyLink}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                disabled={disabled}>
                                Battlefy&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
                            </Button>
                            </a>
                            </div>
                        </>:
                        <Button 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                style={{marginTop:'2vh'}}
                                onClick={closeDialog}>
                                Expirado&nbsp;&nbsp;
                            </Button>
                        }
                        </>
                            :
                            <>
                        {!isSuccess?<LoadingButton  
                            variant="contained" 
                            color="primary" 
                            size="large"
                            style={{backgroundColor:
                            value=='' 
                            || isError 
                            || scoreError
                            || disabled 
                            || screenshotError
                            ?"gray":
                            'white', 
                            color:
                            value=='' 
                            ||isError 
                            || scoreError 
                            || disabled 
                            || screenshotError?
                            "#a8a8a8":
                            'purple',
                            textTransform:'none'}}
                            loading={loading}
                            onClick={Participate}
                            disabled={
                                value=='' 
                                || disabled
                                || screenshotError}>
                            Participa&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
                        </LoadingButton>
                        :
                        <LoadingButton  
                            variant="contained" 
                            color="primary" 
                            size="large"
                            style={{backgroundColor:'green'}}
                            loading={false}
                            onClick={closeDialog}>
                            <MDBIcon icon="check" />&nbsp;&nbsp;¡Estás participando!
                        </LoadingButton>
                        }
                        </>
                        }    
                        </div>
                        </div>
                    </DialogTitle>
                   
                    {props.eventType==TOURNAMENTS?
                    <>
                        <div className={styles.contentFstContainer}>
                        <div className={styles.keyValContainer}>
                            <div className={styles.heading}><strong>Tipo</strong></div>
                            <div className={styles.value}>{props.type}</div>
                        </div>
                        <div className={styles.keyValContainer}>
                            <div className={styles.heading}><strong>Premio</strong></div>
                            <div className={styles.value}>{props.prize}</div>
                        </div>
                        </div>
                        <div className={styles.contentSecContainer}>
                        <div className={styles.keyValContainer}>
                            <div className={styles.heading}><strong>Descripción</strong></div>
                            <div 
                            dangerouslySetInnerHTML={{ __html: props.description }}
                            className={styles.value} 
                            />
                        </div>
                        </div></> 
                        :null}
                        </>:
                            <div className={styles.loadingContainer}>
                                <CircularProgress color="inherit" />
                            </div>}
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
        </div>
    )
}