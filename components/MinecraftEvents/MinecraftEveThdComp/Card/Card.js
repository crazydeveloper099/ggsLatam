import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

export default function MinecraftEveFstComp(props) {

    return(
        <div className={styles.main}>
            <div className={styles.eventName}>
                {props.eventName}
            </div>
            <div className={styles.cardContainer}>
                <img className={styles.img} src={props.img} alt=""/>
                <div className={styles.textContainer}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <div className={styles.description}>
                    <div dangerouslySetInnerHTML={{ __html: props.description}}
                        />
                        
                    </div>

                    <Link href={props.link}>
                    <Button variant="contained" color="primary" size='large' 
                            className={styles.buttonBlue}>
                        INSCRÍBETE
                    </Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}