import Header from '../components/Header/Header.js'
import Footer from '../components/Footer/Footer.js'
import WalletFstComp from '../components/Wallet/WalletFstComp/WalletFstComp.js';
import WalletSecComp from '../components/Wallet/WalletSecComp/WalletSecComp.js';
import {IS_DEV, DEV_URL, PROD_URL} from '../Constants/Constants.js';
import axios from 'axios';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function Wallet() {

    const[isLoading, setIsLoading]=useState(true);
    const[profileData,setProfileData]=useState(null);
    const[walletData,setWalletData]=useState(null);

    const[isLoggedIn,setIsLoggedIn ]=useState(true);
    const[openInvalidLoginDialog, setOpenInvalidLoginDialog]=useState(false);

    useEffect(()=>{
        if(profileData!=null && walletData!=null){
            setIsLoading(false)
        }
    },[profileData, walletData])



 const fetchProfileData=async(email)=>{
    const URL=IS_DEV?DEV_URL:PROD_URL;


    const [profileData, transactionsData] = await Promise.all([
        axios.post(`${URL}/getProfile`,{email}),
        axios.post(`${URL}/getWalletTransactions`,{email})
      ]);
      setProfileData(profileData.data.data.Item)
        setWalletData([...transactionsData.data.data])
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
        <div style={{ backgroundColor:'#1b0020'}}>
            <Header />
            {
                isLoggedIn?
                <>
            <WalletFstComp
                isLoading={isLoading}
                profileData={profileData}
              />
            <WalletSecComp
                isLoading={isLoading}
                profileData={profileData}
                walletData={walletData}
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
                            <Button style={{background:'white',
                            color:'#5727bf',
                            marginTop:'2vh',
                            fontFamily:'avenir'}} 
                            variant='filled' >
                                Iniciar Sesión
                            </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            }
            <Footer />
        </div>
    )
}