import Particles from 'react-particles-js';
import styles from './css/styles.module.css';
export default function ParticlesBackground() {
    return(
      <div className={styles.imgBackground}>

      <Particles width='98vw' height='100vh'
      params={{
        particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800
              }
            },
           
            line_linked: {
              "color": {
                "value": "#ce00ce"
              },   
            				shadow: {
            					enable: true,
            					color: "#ce00ce",
            					blur: 5
            				}
            }
          }
            	}}
              
       />
       </div>
    )
}