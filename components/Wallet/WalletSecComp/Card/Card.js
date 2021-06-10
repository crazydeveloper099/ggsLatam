import styles from './css/styles.module.css';

export default function Card(props) {
    console.log(props,5555);
    return(
        <div className={styles.main}>
            <img src='https://www.flaticon.com/svg/vstatic/svg/1435/1435974.svg?token=exp=1620657140~hmac=80bfaeb8169ec748abfb4bd6f87d394c'
            className={styles.logo} 
            alt=""/>
             <div className={styles.textBoxRanking}>
                <div className={styles.textBoxRankingFstTxt}>
                Retiro
                </div>
                <div className={styles.textBoxRankingSecTxt}>
                {props.date}
                </div>
            </div>
            <div className={styles.textBoxRanking}>
                <div className={styles.textBoxRankingFstTxt}>
                Método
                </div>
                <div className={styles.textBoxRankingSecTxt}>
                Transferencia Bancaria
                </div>
            </div>
            <div className={styles.textBoxRanking}>
                <div className={styles.textBoxRankingSecTxt}>
                Cantidad
                </div>
                <div className={styles.textBoxRankingFstTxt}>
                {props.amount}
                </div>
                
            </div>
        </div>
    )
}