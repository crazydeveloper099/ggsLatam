import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer.js'
import Header from '../components/Header/Header.js'
import ProfileFstComp from '../components/Profile/ProfileFstComp/ProfileFstComp.js'
import ProfileSecComp from '../components/Profile/ProfileSecComp/ProfileSecComp.js'
import ProfileThdComp from '../components/Profile/ProfileThdComp/ProfileThdComp.js';
import {IS_DEV, DEV_URL, PROD_URL} from '../Constants/Constants.js';
import axios from 'axios';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import Link from 'next/link';

export default function Profile() {

    const[isLoading, setIsLoading]=useState(true);
    const[profileData,setProfileData]=useState(null);
    const[isLoggedIn,setIsLoggedIn ]=useState(true);
    const[openInvalidLoginDialog, setOpenInvalidLoginDialog]=useState(false);

    useEffect(()=>{
        if(profileData!=null){
            setIsLoading(false)
        }
    },[profileData])


    const fetchProfileData=(email)=>{
        const URL=IS_DEV?DEV_URL:PROD_URL;

            axios.post(`${URL}/getProfile`,
            {email})
              .then(res=>{
                  console.log(res,8888);
                console.log(res);
                  if(res.status==200){
                    if(res.data.status=='success'){
                       
                        setProfileData(res.data.data.Item)
                    }
                    else{
                        setIsLoading(false)
                    }  
                  } 
                  else setIsLoading(false)
            })
            .catch(err=>setIsLoading(false))
          }


    useEffect(()=>{
        if(localStorage.email)
        {
            fetchProfileData(localStorage.getItem('email'));
        }
        else {
            setIsLoggedIn(false);
            setOpenInvalidLoginDialog(true);
        }
    },[]);

return(
    <div style={{backgroundColor:'#1b0020'}}>
   
        <Header />
        {
        isLoggedIn?
        <>
        <ProfileFstComp 
            isLoading={isLoading}
            profileData={profileData}
             />
            <ProfileSecComp 
            isLoading={isLoading}
            profileData={profileData} 
             />
            <ProfileThdComp 
            isLoading={isLoading}
            profileData={profileData}
             />
             </>
             :
             <Dialog 
             disableEscapeKeyDown
                PaperProps={{
                    style: {
                    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
                    },
                }}
                open={openInvalidLoginDialog} 
                onClose={()=>setOpenInvalidLoginDialog(false)}>
                    <DialogContent>
                        <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        color:'white',
                        padding:'4vw',
                        fontFamily:'avenir'}}>
                            <div>
                                Please login to view this page.
                            </div>
                            <div>

                                <Link href="/register">
                                <Button style={{background:'white',
                            color:'#5727bf',
                            marginTop:'2vh',
                            fontFamily:'avenir'}} 
                            variant='filled' >
                                Iniciar Sesión
                            </Button>
                                </Link>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
        }
        <Footer />
    </div>
    )
}