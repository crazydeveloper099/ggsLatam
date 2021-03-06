import styles from '../css/styles.module.css';
import {  MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Card from '../Card/Card.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import {useState} from 'react';
import { withRouter, useRouter } from 'next/router'

export default function StaticChallenges(props){
    const { asPath } = useRouter()    

    const[inputIndex, setInputIndex]=useState(0)

    const[sort, toggleSort]=useState(false)
    const changeChallenge=(item, index)=>{
        setInputIndex(index)
        props.setClickedChgId(item.challengeId);
        props.setResultLen(JSON.parse(item.resultData).length)
        props.searchResult(item.challengeId);
}


    return(
        <div>
        {props.challengeData!=null?
            props.isResultEmpty==false?
            <>
            <div className={styles.headingConatiner}>
                    <div className={styles.heading}>
                    Selecciona un evento
                    </div>
                </div>
                <form action="">
                <div className={styles.gamesConatiner}>
                    {props.challengeData.map((item,index)=>{
                        return(
                            <div className={styles.card } id={item.challengeId} key={index}
                            onClick={()=>{changeChallenge(item, index)}}>
                            <input
                            type="radio"  className={styles.inputInvisible} 
                            onKeyDown={(e)=>e.preventDefault()} 
                            checked={asPath.split('#').length>2?
                            asPath.split('#')[2]==item.challengeId:
                            index==inputIndex}
                            />
                            <img className={styles.imgNoBorder}
                                
                                src={JSON.parse(item.unitChallenge).Item.src.S} />
                                <div className={styles.cardTitle}>
                                {JSON.parse(item.unitChallenge).Item.challengeName.S}
                                </div>
                            </div>
                        )
                       
                    })}
                </div>
                </form>
                {props.individualResult!=null && props.individualResultReverse!=null
                && props.ResultSc!=undefined && props.ResultSc!=null?
                <div className={styles.resultSc}>
                        <img className={styles.sc} src={props.ResultSc} alt="" />
                    </div>:null
                }  
                <div className={styles.rankingHeading}>
                    MEJORES JUGADORES
                </div>
                 
                <div>
                    
                    <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <div className={styles.filterButton} onClick={()=>toggleSort(!sort)}>
                            <span>{sort?`Ultimo`:`Primero`}</span>  
                            <MDBIcon icon={sort?"chevron-up":"chevron-down"} size='1x' style={
                                {marginLeft:'1vw', alignSelf:'center'}
                            }  />
                        </div>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                {
                    props.individualResult!=null && props.individualResultReverse!=null?
                    
                    !sort?props.individualResult.map((item,pos)=>{
                    return(
                        <Card key={pos} 
                        index={pos+1} 
                        name={item.username} 
                        emailEnc={item.email_enc}
                        prize={props.individualChg.challengePrize.L[pos].S}/>
                    )
                }):
                    props.individualResultReverse.map((item,pos)=>{
                    return(
                        <Card key={pos} 
                        index={props.individualResultReverse.length-pos} 
                        name={item.username} 
                        emailEnc={item.email_enc}
                        prize={props.individualChg.challengePrize.L[props.individualResultReverse.length-pos-1].S}/>
                    )
                }):
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
                }
                
                </div>
                </>:
                <div className={styles.noResults}>
                    <img className={styles.logo} src="/logo.png" alt="" />
                    <div className={styles.heading}>
                    A??n no hay resultados para esta categor??a
                    </div>
                </div>:
                <div className={styles.loadingContainer}>
                    <CircularProgress color="inherit" />
                </div>
            }
    </div>

    )
}