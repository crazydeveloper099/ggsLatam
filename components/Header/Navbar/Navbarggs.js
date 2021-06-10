import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import {useState, useEffect, useRef} from 'react';
import styles from './css/styles.module.css';
import Button from '@material-ui/core/Button';
import { Dropdown } from 'antd';
import {menu} from './menu.js'
import { DownOutlined } from '@ant-design/icons';
import {  MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import AvatarLogo from './AvatarLogo.js';
import { Menu } from 'antd';
import Router from 'next/router'
import ReactGA from 'react-ga';

export default function Navbarggs(props){


  const myProfileRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'My Profile' });
        window.location.href="/profile";
      }
    }
  }
  const walletRedirect=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Wallet' });
        window.location.href="/wallet";
      }
    }
  }

  const redirectHomePage=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Home Page' });
      }
    }
  }

  const leaderBoardTrack=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Leaderboard' });
      }
    }
  }

  const eventTrack=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Events' });
      }
    }
  }

  const minecraftTrack=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Minecraft' });
      }
    }
  }

  const discordTrack=()=>{
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'HEADER', {link: 'Discord' });
      }
    }
  }


  useEffect(()=>{
    ReactGA.initialize('UA-199151865-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])

  const loginButton={
    textTransform:'none',
    fontFamily:'avenir',
    outline:'none'
  }
  const discordButton={
    color:'white',
    textTransform:'none',
    fontFamily:'avenir',
    outline:'none'
  }
  const signupButton={
  
    textTransform:'none',
    fontFamily:'avenir',
    outline:'none'
  }

  const menuProfile = (
    <Menu style={{padding:'1vw 1vw',
    backgroundImage: 'linear-gradient(to right bottom,  #0e2b82, #302da2, #5727bf, #8209d8)',
    }}>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" onClick={myProfileRedirect}>
        Mi perfil
        </a>
      </Menu.Item>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a className={styles.a1} style={{color:'white'}}  rel="noopener noreferrer" onClick={walletRedirect} >
        Mi Billetera
        </a>
      </Menu.Item>
      <Menu.Item   style={{padding:'1vw',background:'transparent'}}>
        <a onClick={e=>{
            e.preventDefault();
            logout()}} 
        className={styles.a1} 
        style={{color:'white'}} 
         rel="noopener noreferrer" href="#">
            Cerrar Sesión
        </a>
      </Menu.Item>
    </Menu>
  );

  const[active, setactive]=useState(false);
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    const [navBackground, setNavBackground] = useState(false)
    const [email,setEmail]=useState('')
    const [toggleClick, setToggleClick]=useState(false)
    const navRef = useRef()

    const logout=()=>{
        localStorage.removeItem('authType')
        localStorage.removeItem('email')
        if (typeof window !== "undefined") {
          if (window.fbq != null) { 
            window.fbq('track', 'HEADER', {link: 'Logout' });
            window.location.href="/";
          }
        }
    }

    navRef.current = navBackground
    useEffect(() => {

      localStorage.getItem('authType')&& localStorage.getItem('email')?
      setIsLoggedIn(true):setIsLoggedIn(false);

      localStorage.getItem('authType')&& localStorage.getItem('email')?
      setEmail(localStorage.getItem('email')):null;

      let [start, ...end] = window.location.href.split('/');
      end = end.join("/");
      console.log(start, end);
      if(end=='')setactive('/');
      else{
        let [start1, ...end1]=end.split('/')
        setactive('/'+end1[1]);
      }



      const handleScroll = () => {
        const show = window.scrollY > 50
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])


    return(
    <Navbar expand="lg" 
        fixed="top"
        style={{ transition: '1s ease',
        boxShadow: navBackground ?`0 0 5px 2px rgba(0, 0, 0 , 1)`:'none',
        backgroundColor: props.isAuth?'#320032': navBackground || toggleClick ? '#320032' : 'transparent',
        padding:'1vw 5vw'}}>
  <Navbar.Brand href="/">
  <div style={{display:'flex',justifyContent:'cwnter',alignItems:'center'}}>
    <img src="/ggsLogo-1.png" className={styles.logo1} alt="" />
    <img src="/ggsLogo-2.png" className={styles.logo2} alt="" />
  </div>
  </Navbar.Brand>
  <Navbar.Toggle onClick={()=>setToggleClick(!toggleClick)} />
      
      <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
  
    <Nav activeKey={active}>
    {
       !isLoggedIn ?
      <Nav.Link 
      href="/wallet"
      onClick={redirectHomePage}
      style={{color:active=='/'?'#ff00ff':' white'
      ,fontFamily:active=='/'?'avenir':'avenir-light'}}
      className={styles.navLink} >
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
      Menú principal
      </div>
      </Nav.Link>:null}


      <Nav.Link href="/leaderboard" 
      onClick={leaderBoardTrack}
      className={styles.navLink}
      style={{color:active=='/leaderboard'?'#ff00ff':' white'
      ,fontFamily:active=='/leaderboard'?'avenir':'avenir-light'}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
                      Resultados
          </div>

      </Nav.Link>

      <Nav.Link href="/events" 
      onClick={eventTrack}
      className={styles.navLink}
      style={{color:active=='/events'?'#ff00ff':' white'
      ,fontFamily:active=='/events'?'avenir':'avenir-light'}}>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
        <Dropdown overlay={menu}>
        
          <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Eventos <DownOutlined />
          </div>
        </Dropdown>
        </div>

      </Nav.Link>




      <Nav.Link href="/minecraft" 
      onClick={minecraftTrack}
      className={styles.navLink}
      style={{color:active=='/minecraft'?'#ff00ff':' white'
      ,fontFamily:active=='/minecraft'?'avenir':'avenir-light'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
                Minecraft
              </div>

      </Nav.Link>

      <Nav.Link target="_blank" href="https://discord.gg/rMTpeETs6Z" 
      onClick={discordTrack}
      className={styles.navLink}>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>

      <Button variant="contained" color='primary' style={discordButton}>
      <MDBIcon fab icon="discord" />&nbsp;Discord</Button>
      
      </div>
      </Nav.Link>
      {
       !isLoggedIn ?
       <>
       <Nav.Link href="/login" 
      className={styles.navLink}
      style={{color:active=='/minecraft'?'#ff00ff':' white'
      ,fontFamily:active=='/minecraft'?'avenir':'avenir-light'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
        <Button variant="contained" style={loginButton}>Iniciar sesión</Button>
        </div>
      </Nav.Link>
      <Nav.Link href="/register" 
      className={styles.navLink}
      style={{color:active=='/minecraft'?'#ff00ff':' white'
      ,fontFamily:active=='/minecraft'?'avenir':'avenir-light'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
          <Button variant="contained" style={signupButton}>Registrarse</Button>
          </div>
        </Nav.Link>
      </>
      :
      <Nav.Link href="/profile" 
      className={styles.navLink}
      style={{color:active=='/minecraft'?'#ff00ff':' white'
      ,fontFamily:active=='/minecraft'?'avenir':'avenir-light'}}>
      <Dropdown overlay={menuProfile}>
          <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <AvatarLogo initial={email[0].toUpperCase()}/><DownOutlined />
          </div> 
          </div>
        </Dropdown>
      </Nav.Link>
      }
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}