import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './GlobeData'
import { getAllUserDatasFP } from '../assets/Json Related Things/JSONAPI';

const Friends = () => {
    const[SuggFri,setSF]=useState(false);
    const{ADOUser}=useContext(UserContext);
    const [FriesFS,setFFS]=useState([]);
    useEffect(()=>{
        const fetfri=async()=>{
        const {data:ALLUsers}=await getAllUserDatasFP();
        console.log(ALLUsers);
        const DWP=ALLUsers?.map((AU)=>{
            var p=0;
            ADOUser.FriendList?.map((FL)=>{
                const x=AU.FriendList?.findIndex((fl)=>fl.fid===FL.fid);
                if(x!==-1)
                p+=5;
            })
            const ADIG=new Set(Object.keys(ADOUser.IntrestedGenres));
            const AUIG=new Set(Object.keys(AU.IntrestedGenres));
            const CG=new Set([...ADIG].filter(genre=>AUIG.has(genre)));
            p+=CG.size;
            const NAUD={...AU,Similarity:p};
            return NAUD;
        })
        console.log(DWP);}
        fetfri();
    },[])
  return (
    <div style={{width:"100%",height:"100vh",position:"fixed",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))"}}>
        <div style={{width:"70%",height:"80%",border:"1px groove green",display:"flex",flexWrap:"wrap",margin:"auto",marginTop:"5%"}}>
            <div style={{width:"35%",height:SuggFri?"65%":"94%",backgroundColor:"white"}}></div>
            <div style={{width:"65%",height:SuggFri?"65%":"94%",backgroundColor:"blue"}}></div>
            <div style={{width:"100%",height:SuggFri?"35%":"6%",backgroundColor:"red"}}>
                <div style={{width:"100%",height:SuggFri?"20%":"100%",backgroundColor:"white",display:"flex",justifyContent:"space-between"}}>
                <p onClick={(event)=>setSF(true)} style={{marginLeft:"4%"}}>Suggested For You</p>
                {(SuggFri)?<p style={{marginRight:"2%"}} onClick={(event)=>setSF(false)}>×</p>:null}
                </div>
                {(SuggFri)?<div style={{width:"100%",height:"80%"}}>

                </div>:null}
            </div>
        </div>
    </div>
  )
}

export default Friends