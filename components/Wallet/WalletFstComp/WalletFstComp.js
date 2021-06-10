import styles from './css/styles.module.css';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import {MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function WalletFstComp(props) {
    return(
        <div>
            <div className={styles.ImgContainer}>
                <img src="/Profile.png" 
                alt=""
                className={styles.img}    
                />
                {/* <div className={styles.imgOverlay} />  */}
                <Particles height='100%' zIndex='4' />
                {!props.isLoading?
                <>
                <div className={styles.firstBox}>
                    <div className={styles.initialsContainer}>
                    {props.profileData.email.S[0].toUpperCase()}
                    </div>
                    <div className={styles.firstBoxTextContainer}>
                        <div className={styles.heading}>
                        {props.profileData.name.S}
                        </div>
                        <div className={styles.smallText}>
                        {props.profileData.email.S}
                        </div>
                        <div className={styles.buttonOrient}>
                            <div className={styles.earningsBox}>
                                <Button variant="contained" color="primary" size='large'
                                className={styles.buttonCust2}  
                                >
                                       Total ganado: {props.profileData.wallet_amount.S}
                                       &nbsp;
                                       Coins
                                </Button>
                            </div>
                            <div className={styles.walletButton}>
                            <a target="_blank"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeoAv9VML9AKC0CMDGTIU9p9OTx5nHBeRJZ0lFlvltPFoUUyQ/viewform">
                                <Button variant="contained" color="primary" size='large'
                                className={styles.buttonCust1} 
                               >
                                    <MDBIcon icon="wallet" />&nbsp;&nbsp;Retirar saldo
                                </Button>
                            </a>
                            </div>
                            {/* <div className={styles.walletButton}>
                                <MDBIcon icon="wallet" /> Retirar saldo
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* <div className={styles.secondBox}>
                <div className={styles.secondBoxContainer}>
                <div style={{display:'flex', alignItems:'center'}}>
                <img src="/ggsCoin.png" className={styles.ggsCoinLogo} alt="" />
                <div className={styles.textBoxRanking}>
                    <div>
                    <div className={styles.textBoxRankingFstTxt}>        
                    {props.profileData.wallet_amount.S}
                    </div>
                    </div>
                </div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                <Link href="/profile">
                    <Button variant="contained" color="primary" size='large' 
                    style={{background:'#9400D3', 
                            fontSize:'0.7vw', 
                            padding:'0.5vw 2vw', 
                            }}>
                    Mi Prifil
                    </Button>
                </Link>
                </div>
                </div>
                </div> */}
                </>
                :
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>}
            </div>       
        </div>
    )
}