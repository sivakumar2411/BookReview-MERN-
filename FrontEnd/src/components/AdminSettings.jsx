import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './GlobeData';
import "../assets/Css Files/Profile.css";
import Admins from './Admins';
import ManaBooks from './ManaBooks';
import ManaUsers from './ManaUsers';
import { SvgIcon } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import  "../assets/Css Files/AdminSettings.css";

const AdminSettings = () => {
    const[admbmu,setPos]=useState({admin:true,mb:false,mu:false});
    const {adminaa}=useContext(UserContext);
    const navi=useNavigate();
    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }
  return (
    <div style={{width:"100%",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",height:"100vh",position:"fixed"}}>
        <div id='homebutdiv' title='Home' style={{cursor:"pointer"}} onClick={(event)=>navi("/HomeBR")}><HomeIcon fontSize="large" sx={{ color: pink[500] }} /></div>
        <div id='AdminSettingsWholeDiv'>
            <ul id='AdminSettingsWholeDivHeaders'>
                {(adminaa)?(<><li onClick={(event)=>setPos({admin:true,mb:false,mu:false})}>Admin</li>
                <li onClick={(event)=>setPos({admin:false,mb:true,mu:false})}>Manage Books</li>
                <li onClick={(event)=>setPos({admin:false,mb:false,mu:true})}>Manage Users</li></>):<li style={{marginRight:"70px"}}>Admin</li>}
            </ul>
            <div style={{width:"80%",height:"80%",margin:"auto",borderTop:"1px groove white"}}>
                {(admbmu.admin)?<Admins/>:null}
                {(admbmu.mb)?<ManaBooks/>:null}
                {(admbmu.mu)?<ManaUsers/>:null}
            </div>
        </div>
    </div>
  )
}

export default AdminSettings