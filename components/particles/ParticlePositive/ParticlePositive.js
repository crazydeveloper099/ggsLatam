import Particles from 'react-particles-js';
import styles from './css/styles.module.css';
export default function ParticlesBackground(props) {
    return(
      <div className={styles.imgBackground} style={{zIndex:props.zIndex}}>
      <Particles width='98vw' height={props.height}
      params={{
        particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 800
              }
            },
           
            line_linked: {
              "color": {
                "value": "#ff8243"
              },   
            }
          }
        }}
              
       />
       </div>
    )
}