import styles from './css/styles.module.css';
import Table from 'react-bootstrap/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LIVE_EVENT, MINECRAFT, STATIC_CHALLENGE, TOURNAMENTS } from '../../../../Constants/Constants';

export default function EventThdComp(props) {
    return(
        <div className={styles.main}>
            <div className={styles.heading}>
            Lista de jugadores
            </div>
            {!props.isLoading?
            'usersData' in props.challengeData?
            <div className={styles.value}>
            <Table borderless  hover size='lg'  >
                <thead  style={{color:'white'}}>
                    <tr>
                    <th className={styles.th}>#</th>
                    <th className={styles.th}>Participante</th>
                    {props.challengeData.eventType.S==MINECRAFT || 
                        props.challengeData.eventType.S==STATIC_CHALLENGE?
                    <th className={styles.th}>Puntaje</th>:null
                    }
                    <th className={styles.th}>Victorias</th>
                    <th className={styles.th}>Total participado</th>
                    <th className={styles.th}>Total ganado</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {JSON.parse(props.challengeData.usersData.S).map((item,index)=>{
                        return(
                            <tr className={styles.tr} key={index+1}>
                                <td className={styles.td}>{index+1}</td>
                                <td className={styles.td}>{item.name}</td>
                                {props.challengeData.eventType.S==MINECRAFT || 
                                        props.challengeData.eventType.S==STATIC_CHALLENGE?
                                        <td className={styles.td}>{props.challengeData.userImg.L[index].M.gameScore.S}</td>:null
                                    }
                                <td className={styles.td}>{item.win_count}</td>
                                <td className={styles.td}>{item.total_count}</td>
                                <td className={styles.td}>{
                                    item.win_count!='-' && 
                                    item.total_count!='-'?
                                    ((parseInt((parseInt(item.win_count)/parseInt(item.total_count))*100)).toString()+'%')
                                    :
                                    '-'
                                    }
                                </td>
                            </tr>
                        )
                    })}
                
                </tbody>
                </Table>
            </div>
            :
            <div className={styles.centerJoinMsg}>
                    <img className={styles.ggsLogo} src="/logo.png" />
                   <span style={{marginTop:'5vh'}}>¡Sé el primero en unirte!</span>
            </div>
            :
            <div className={styles.loadingContainer}>
                <CircularProgress color="inherit" />
            </div>
            }
        </div>
    )
}