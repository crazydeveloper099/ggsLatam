import Button from '@material-ui/core/Button';
import Link from 'next/link'
export default function ToastView(props){
    return(
    <div className='toastContainer'>
            {/* <img src='ggsLogo.png' alt="" className='imgToast' /> */}
            <div className='textContainerToast'>
                <div className='headingToast'>{props.title}</div>
                <div className='contentToast'>{props.body}</div>
            </div>
            <div className='buttonContainerToast'>
            <a target='_blank' href={props.link}>
                <Button variant="contained" color="secondary" style={{textTransform:'none'}}>
                Ver
                </Button>
                </a>
            </div>    
        </div>
    )
}