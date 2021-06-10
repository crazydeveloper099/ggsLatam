import firebase from '../../../Firebase/Firebase.js';
import "firebase/messaging";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import ToastView from './ToastView.js'
import { DEV_URL, IS_DEV, PROD_URL } from '../../../Constants/Constants.js';

export default function ToastElement(props){


    useEffect(()=>{
     
      if (firebase.messaging.isSupported()){

    const messaging = firebase.messaging()

  window.addEventListener('load', () => {
    
    if(!('serviceWorker'  in navigator)) { 
    navigator.serviceWorker.register('firebase-messaging-sw.js').then((registration) => {
      messaging.useServiceWorker(registration)
    })
  }

    firebase.app().messaging().requestPermission()
    .then(()=>{
      return messaging.getToken();
    })
    .then((currentToken)=>{
      if (currentToken) {
          console.log(currentToken);
        const URL=IS_DEV?DEV_URL:PROD_URL;
        axios.post(`${URL}/subscribeFCM`,
        {'token':currentToken})
          .then(res=>{
          }).catch((err)=>console.log(err));

        localStorage.setItem('fcmToken',currentToken)
      firebase.messaging().onMessage((payload) => {
          toast.dark(
        <ToastView 
        title={payload.notification.title}
        body={payload.notification.body}
        icon={payload.notification.icon}
        link={payload.notification.click_action} />
        ,{
          position: "bottom-left",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

        });
      }, e => {
        console.log(e)
      })
    }
    })
    .catch(()=>{

    })
  })
}
  },[])


    return(
        <ToastContainer className='toastWidth' />
    )
}