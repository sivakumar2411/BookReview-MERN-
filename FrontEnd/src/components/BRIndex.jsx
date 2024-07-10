import React, { useContext, useEffect } from 'react';
// import MenuIcon from '@mui/icons-material/Menu';
import '../assets/Css Files/BRIndex.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { /*Button,*/ SvgIcon } from '@mui/material';
import { UserContext } from './GlobeData';
import { profImg } from './BRDatas';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {UpdateUser} from '../assets/Json Related Things/JSONAPI.js';
import HelpIcon from '@mui/icons-material/Help';
import { pink } from '@mui/material/colors';

const BRIndex = () => {
    const {LoggedIn,LogOut}=useContext(UserContext);
    const [profdiv,setProfdiv]=useState(false);
    const [notidiv,setnotidiv]=useState(false);
    const [unseennotis,setunno]=useState(0);
    const {ADOUser,Update}=useContext(UserContext);
    // const [menu,setMenu]=useState(false);
    const [User,setUser]=useState(ADOUser);
    const naviga=useNavigate();
    const goHome=()=>
    {
        naviga('/HomeBR');
    }
    const goRev=()=>
    {
        naviga('/Reviews');
    }
    const goco=()=>
    {
        naviga('/Contact')
    }
    useEffect(()=>{
        if(LoggedIn)
        {
            UpdateUser(User);
            Update(User);
            setunno(User?.notification?.reduce((sum,{seen})=>{return seen?0:1;},0));
        }
    },[User])
  return (
    <div id='base'>
        {/*{menu?
    <div id='sidebar' style={{width:"200px"}}>
        <ul id='sideul'>
        <button id='menuexit' style={{cursor:"pointer"}}  onClick={(event)=>{setMenu(false)}}>×</button>
            <li id='sli' style={{marginTop:"40px"}}>Settings</li>
            <li id='sli'>Help</li>
            //{(LoggedIn)?<li id='sli' onClick={(event)=>naviga('/Friends')}>Friends</li>:null}
            <li id='sli' onClick={(event)=>naviga('/AdminSettings')}>Admin</li>
        </ul>
        <ul></ul>
        </div>:<div style={{height:"50px",position:"absolute"}} onClick={(event)=>{setMenu(true)}}><Button><MenuIcon  style={{width:"40px",height:"40px"}}/></Button></div>}*/}
        <div className='newside01' title='Settings' id='Newsidebar'><SvgIcon sx={{color:pink[500]}} id='newsideicon' >
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    </SvgIcon></div>
    <div className='newside02' id='Newsidebar' title='Help'><HelpIcon color='primary' id='newsideicon' /></div>
    <div className='newside03' id='Newsidebar' title='Admin' onClick={(event)=>naviga('/AdminSettings')}><p id='newside03icon' >A</p></div>
        <div id='navbar'>
            <ul id='navul'>
                <li id='nli'  onClick={goHome}>Home</li>
                <li id='nli'  onClick={goRev}>Reviews</li>
                <li id='nli' onClick={(event)=>naviga('/Books')}>Books</li>
                <li id='nli' onClick={goco}>Contact Us</li>
                {(LoggedIn)?(<><div id='profileonhome' >
                    <img id='homeprofileimage' onClick={(event)=>{setProfdiv(true);setnotidiv(false)}} src={ADOUser.profilePic.url?ADOUser.profilePic.url:[profImg.Img]} alt={ADOUser.name} ></img>
                </div><div id='notidivtrigger' onClick={(event)=>{setnotidiv(true);setProfdiv(false);}}><NotificationsIcon color={unseennotis!==0?'primary':''} style={{fontSize:"80%",opacity:unseennotis===0?".4":""}}/>{(unseennotis!==0)?<div id='unseennotisdiv' >{unseennotis}</div>:null}</div></>):<div id='brlogbut' onClick={()=>naviga('/SignIn')} >LogIn</div>}
            </ul>
        </div>
        {(profdiv)?(<div id='profileclickdiv'>
            <div id='homeprofilenameimageholder'>
                <div id='homeprofileinnerimagediv' ><img src={ADOUser.profilePic.url?ADOUser.profilePic.url:[profImg.Img]} alt={ADOUser.name} id='profiledivinnerimage'></img></div>
                <div id='homepageinnername'>
                    <div id='homepagename' onClick={(event)=>naviga('/Profile')}>{ADOUser.name}</div>
                    <div id='homepageusername'>@{ADOUser.uname}</div>
                </div>
            </div>
                <ul id='homepageuldetails' >
                    <li id='profileli' onClick={(event)=>naviga('/Profile')}>Profile</li>
                    <li id='profileli' onClick={(event)=>{LogOut();setProfdiv(false);setnotidiv(false)}}>Logout</li>
                </ul>
            <div id='profileclosecross' onClick={(event)=>setProfdiv(false)}>×</div>
        </div>):null}
        {(notidiv)?<div id='notidiv' ><div id='notidivclosex' onClick={(event)=>{setnotidiv(false);setunno(0);const Nmsg=User.notification?.map((msg)=>{const Nm={...msg,seen:true};return Nm});setUser((PU)=>({...PU,notification:Nmsg}));}}>×</div>
            <div id='divwithallnotifications'>
            {ADOUser.notification?.map((noti)=>(
                <div key={noti.id} id='divwithnotis' style={{opacity:noti.seen?".6":""}}>{noti.msg}</div>
            ))}
            </div></div>:null}
    </div>
  )
}

export default BRIndex