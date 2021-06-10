import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
export default function EventsSecComp(props){
return(
        <div>
		    <style>{cssstyle}</style>
            <div className='scaleDiv'>
			<div style={
                            {backgroundImage: 
                            `url(${props.img})`
                            }} 
                            className='img' >
                         <div className='heading'>
                         <div >
                         <span style={{color:'orange'}}>{props.title}</span> <br/>
                         {props.type} <br/>
                             <span className={styles.smallText}>Reward</span> 
                             <br/>
                             <span style={{color:'#FF00FF'}}>{props.reward}</span>
                         </div>
                             <Link href="/register">
                            <Button variant="contained" color="primary" size='large' 
                            style={{background:'#FF00FF', 
                                    fontSize:'1vw',
                                    margin:'0 auto',
                                    padding:'0.5vw 0.9vw', 
                                    marginTop:'2vw'}}>
                            QUIERO PARTICIPAR
                            </Button>
                            </Link>
                        </div>
                        </div>
					</div>
                    </div>		
					)
}

const cssstyle = `

.scaleDiv{
    width: 40vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.heading{
    text-align: center;
    color: #d8d8d8;
    font-size: 1.7vw;
    padding: 0;
    margin: 0;
    line-height: 2vw;
    margin-top: 1vw;
    box-sizing: border-box;
    font-family: 'avenir';
    display:none;
    height:100%;
}

.img {
    width:100%;
    height:80%;
    background-size: cover;                     
    background-repeat: no-repeat;
    background-position: center center; 
    background-blend-mode: multiply;
    background-color: rgba(0,0,0,0.8);
    border-radius:0px;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.center .slick-center .scaleDiv {
    opacity: 1;
    
    -ms-transform: scale(1.2);
    transform: scale(1.2);
}
.center .slick-center .heading {
    display:flex;
    align-item:center;
    justify-content:center;
    flex-direction:column;

  opacity: 1;
  transition: display 1s linear 1s, opacity 1s;
}
.center .slick-center .img {
    background-color: rgba(0,0,0,0.3);
}

.center .scaleDiv {
    transition: all .3s ease;
}
`