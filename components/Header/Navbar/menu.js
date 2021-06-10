import { Menu, Dropdown } from 'antd';
import styles from './css/styles.module.css'


export const menu = (
    <Menu style={{padding:'1vw 1vw',
    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
    }}>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" href="/events#liveEvent">
          Salas En Vivo
        </a>
      </Menu.Item>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" href="/events#staticEvents">
          Retos
        </a>
      </Menu.Item>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" href="/events#tournament">
          Torneos
        </a>
      </Menu.Item>
      <Menu.Item style={{padding:'1vw',background:'transparent'}}>
        <a  className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" href="/minecraft">
          Minecraft
        </a>
      </Menu.Item>
    </Menu>
  ); 
