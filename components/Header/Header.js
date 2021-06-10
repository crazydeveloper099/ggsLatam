import Head from 'next/head'
import Navbarggs from './Navbar/Navbarggs.js';
import ToastElement from './ToastElement/ToastElement.js';
export default function Header(props){

  const advancedMatching = {};
  const options = {autoConfig: true, debug: false };


    return(
      <div style={{width:'100%'}}>
      <Head>
        <title>GGs Latam</title>
        <link rel="icon" href="/ggsLogo.png" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.15.2/antd.compact.min.css" integrity="sha512-M/Z/dD0cVmF3czwK0Jzz26dSB7tLuWpOtUsrardM7j2rXTE3L8XFQHQDysDU8bXKs2r3T+7jW0Kq9699NKAKzw==" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <script type="text/javascript" src="/js/fbPixel.js"></script>
        <script type="text/javascript" src="/js/googleTagManager.js"></script>
        </Head>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSKLXVM"
        height="0" width="0" style={{display:'none',visibility:'hidden'}} />  
      <Navbarggs isAuth={props.isAuth} />
      <ToastElement />
      </div>
    )
}