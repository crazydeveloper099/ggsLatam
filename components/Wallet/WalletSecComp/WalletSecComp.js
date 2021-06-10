import styles from './css/styles.module.css';
import Card from './Card/Card.js'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function WalletFstComp(props) {
console.log(props);

    return(
        <div className={styles.main}>
            <div className={styles.heading}>
            Movimientos de saldo
            </div>
            {!props.isLoading?
                <>
                  <div className={styles.noResults}>
                    <img className={styles.logo} src="/logo.png" alt="" />
                    <div className={styles.heading}>
                    Esta función estará disponible en breve
                    </div>
                
                </div>
            {/* <div className={styles.cardContainer}>
            {
                props.walletData.slice(15).map((item, index)=>{
                    return(
                        <Card 
                            key={index}
                            date={item.timeStamp}
                            amount={item.value}
                            method='-'
                            action={item.action}
                        />
                    )
                })
            }
            </div> */}
            </>
            :
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>}
        </div>
   )
}