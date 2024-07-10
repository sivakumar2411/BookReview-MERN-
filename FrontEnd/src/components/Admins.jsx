import React, { useEffect, useState } from 'react'
import { getAllUserDatasFP } from '../assets/Json Related Things/JSONAPI';
import { profImg } from './BRDatas';
import '../assets/Css Files/AdminSettings.css'

const Admins = () => {
    const [admins,setAd]=useState([]);
    useEffect(()=>
    {
        const fetch=async()=>{
            await getAllUserDatasFP()
            .then((res)=>{setAd(res.data)});
        }
        fetch();
    },[])
  return (
    <div style={{width:"100%",height:"100%",display:"flex",flexWrap:"wrap",justifyContent:"space-between",paddingLeft:"50px",overflow:"auto"}}>
        {admins?.map((adm)=>
        (
            <div id='AdminsDetailsDivDiv' key={adm.id}>
                {(adm.admin)?(
                    <div id='AdminsDetailsDiv'>
                        <div id='AdminsDetailsDivProfilPicDiv'><img src={adm.profilePic?.url?adm.profilePic.url:[profImg.Img]} alt={adm.uname} id='AdminsDetailsDivProfilPic'/></div>
                        <div id='AdminsDetailsDivNameUDiv'>
                            <div id='AdminsDetailsDivName'>{adm.name}</div>
                            <div style={{margin:"auto",color:"white",fontSize:"16px",width:"160px",textAlign:"center",height:"30px",opacity:".8"}}>{adm.uname}</div>
                        </div>
                    </div>
                    ):null}
            </div>
        ))}
    </div>
  )
}

export default Admins