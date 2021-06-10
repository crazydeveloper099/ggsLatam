import styles from './css/styles.module.css';
import Particles from '../../particles/ParticlePositive/ParticlePositive.js'
import {MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';

 
export default function ProfileFstComp(props) {
    return(
        <div>
            <div className={styles.ImgContainer}>
                <img src="/Profile.png" 
                alt=""
                className={styles.img}    
                />
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
                        <div style={{display: 'flex'}}>
                            <div className={styles.earningsBox}>
                            Total ganado: {props.profileData.wallet_amount.S}
                            &nbsp;
                            Coins
                            </div>
                            {/* <div className={styles.walletButton}>
                            </div> */}
                        </div>
                    </div>
                </div>
                        
                </>:
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
                }
            </div>
            
        </div>
    )
}