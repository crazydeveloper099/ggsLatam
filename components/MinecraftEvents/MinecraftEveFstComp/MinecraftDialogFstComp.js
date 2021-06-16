import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../EventPage/EventThdComp/TabPanel/TabPanel.js';
import React from 'react';
import PCTab from './PCTab.js';
import MobileTab from './MobileTab.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useState,useEffect,useRef} from 'react';
import styles from './css/styles.module.css';
import {tabStyles} from './styles.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {useStyles} from '../../Dialog/DialogStyles.js';
import {IS_DEV, DEV_URL, PROD_URL} from '../../../Constants/Constants.js';
import { Button, TextField } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  MDBIcon } from "mdbreact";
import Link from 'next/link'

export default function MinecraftDialogFstComp(props){
    const classes = useStyles();
    const [value1, setValue] = useState(0);
    const [isLoading, setIsLoading]=useState(true);
    const [isLoggedIn, setIsLoggedIn]=useState(true);
    const [isMCUsernameSet,setIsMCUsernameSet]=useState(false);
    const [inputError, serInputError]=useState(false);
    const [inputVal, setInputVal]=useState('');
    const [updatingUsername, setUpdatingUsername]=useState(false);
    const [email, setEmail]=useState('');
    const [serverDown, setServerDown]=useState(false);

    const handleClose = () => {
        props.setOpenDialog(false);
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    }
      
    const whitelistUser=()=>{
      if(inputVal.length>2){
        setUpdatingUsername(true);
        setServerDown(false)
        serInputError(false)
        if(!inputError){
          const URL=IS_DEV?DEV_URL:PROD_URL;
          axios.post(`${URL}/mcWhitelistUser`,{email,username:inputVal })
          .then(res=>{
            console.log(res);
            if(res.status==200){
              setUpdatingUsername(false);  
              if(res.data.status=='OK'){
                setIsMCUsernameSet(true);  
              }
              else{
                setServerDown(true)
              }
            }
          })
        }
      }
      else{
        serInputError(true)
      }
    }

    const fetchProfileData=(email)=>{
      const URL=IS_DEV?DEV_URL:PROD_URL;
          axios.post(`${URL}/getProfile`,
          {email})
            .then(res=>{
             
                setIsLoading(false)
            
                if(res.status==200){
                  if(res.data.status=='success'){
                      if('mc_whitelisted' in res.data.data.Item){
                       
                        if(res.data.data.Item.mc_whitelisted.BOOL==true){
                          setIsMCUsernameSet(true)
                        }
                        else{
                          setIsMCUsernameSet(false)
                        }
                      }
                  }
                }
          })
          .catch(err=>setIsLoading(false))
    }

    useEffect(() => {
      if(inputVal!='' && inputVal!=null && inputVal!=undefined){
        inputVal.length>2?serInputError(false):serInputError(true)
      }
    }, [inputVal]);


    const descriptionElementRef = useRef(null);
    useEffect(() => {
      if (props.openDialog) {
        if(localStorage.getItem('authType')&& localStorage.getItem('email')){
        setIsLoggedIn(true);
        fetchProfileData(localStorage.getItem('email'));
        setEmail(localStorage.getItem('email'));
      }
      else{
        setIsLoggedIn(false)
        setIsLoading(false)
      }

        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [props.openDialog]);

   
    return(
      <Dialog
            PaperProps={{
                    style: {
                    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
                    },
                }}
        open={props.openDialog}
        onClose={updatingUsername?null:handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
      {!isLoading?
        isMCUsernameSet?
      <>
        <DialogTitle id="scroll-dialog-title" style={{textAlign:'center'}}>
        <img src="/logo.png" className={styles.logo} alt="" />
        <div style={{color:'white',fontFamily:'avenir'}}>Cómo acceder a nuestra Network</div> </DialogTitle>
        <DialogContent dividers={props.scroll === 'paper'} >
        
        <div>
        <AppBar 
        position="static" 
        color="default"
        style={{background:'transparent',boxShadow: 'none'}}>
          <Tabs
          
            value={value1}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="white"
            variant='fullWidth'>
            <Tab style={tabStyles.tab}
            label="PC" 
            id='full-width-tab-0' />
            <Tab style={tabStyles.tab}
            label="Móvil / Bedrock: (Mobile version)" 
            id='full-width-tab-1' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis='x-reverse'
          index={value1}
          onChangeIndex={handleChangeIndex}>
          <TabPanel  
          value1={value1} 
          index={0} 
          children={<PCTab setOpen={props.setOpenSnack} />}
          />
          <TabPanel 
          value1={value1} 
          index={1}   
          children={<MobileTab setOpen={props.setOpenSnack} />}
          />
        </SwipeableViews>  
      </div>
      </DialogContent>
      </>
        :
        <>
        <DialogTitle id="scroll-dialog-title" style={{textAlign:'center'}}>
        <img src="/logo.png" className={styles.logo} alt="" />
        <div style={{color:'white',fontFamily:'avenir'}}>¡Primero regístrate en la lista blanca!</div> </DialogTitle>
        <DialogContent dividers={props.scroll === 'paper'} >
        
        <div style={{textAlign:'center'}}>
        <div className={styles.keyValContainer}>
          <div className={styles.value} style={{textAlign:'center'}}>
                <TextField
                    style={{width:'80%'}}
                    className={classes.root}
                    error={inputError}
                    value={inputVal}
                    onChange={(e)=>setInputVal(e.target.value)}
                    id="outlined-error-helper-text"
                    label="TU NICKNAME DE MINECRAFT"
                    helperText={inputError?
                        'Nickname inválido':null}
                    variant="outlined"
                    disabled={!isLoggedIn || updatingUsername}
                />
            </div>
            <div className={styles.info_mcWhitelist}>
            {serverDown?<><span style={{color:'orange'}}> Lo sentimos, el servidor se encuentra offline. Inténtalo más tarde</span><br /></>:null}

            REVISALO ANTES DE ENVIAR, YA QUE NO PODRÁS MODIFICARLO LUEGO
            </div> 
        </div> 
        {isLoggedIn?
        <LoadingButton 
          variant="contained" 
          color="primary" 
          size="large" 
          style={{borderColor:inputError?"gray":'white', color:inputError?"gray":'white'}}
          loading={updatingUsername}
          onClick={whitelistUser}
          disabled={inputError}>
          enviar&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
      </LoadingButton>
       :
      <Link href='/login'>
        <a>
        <Button 
            variant="contained" 
            color="primary" 
            size="large" >
            Iniciar sesión&nbsp;&nbsp;<MDBIcon icon="chevron-right" />
        </Button>
        </a>
      </Link>
      }
      </div>
      </DialogContent>
      </>
      :
      <DialogTitle id="scroll-dialog-title" style={{textAlign:'center'}}>
        <div className={styles.loadingContainer}>
          <CircularProgress color="inherit" />
         </div>
      </DialogTitle>
      }
      </Dialog>
  )
}