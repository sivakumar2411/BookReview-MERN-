import React, { useEffect, useState } from 'react'
import { AdminChange, DeleteReviews, MSGTOALL, MSGTOID, /*SENDGMAIL,*/ getAllUserDatasFP } from '../assets/Json Related Things/JSONAPI';
import { profImg } from './BRDatas';
import { Delete, Search } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import { Fab } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ManaUsers = () => {
    const [Ausers,setUsers]=useState([]);
    const [users,sur]=useState([]);
    const [sear,setser]=useState("");
    const [delsu,setds]=useState(false);
    const [bid,sbid]=useState(0);
    const [del,sdel]=useState({rid:0,uid:0});
    const [notiall,setna]=useState(false);
    const [noti,setnoti]=useState("");
    const [notitoparti,setnop]=useState(false);
    const [nosi,setnos]=useState({msg:"",id:0});
    const [adminaa,setad]=useState({but:false,data:{}});
    const [mailsend,setms]=useState({but:false,data:{}});
    useEffect(()=>{
        const fetchdata=async()=>{
            const {data:edata}=await getAllUserDatasFP();
            setUsers(edata);
            sur(edata);
        }
        fetchdata();
    },[])
    useEffect(()=>{
        const su=users.filter((use)=>use.name.toLowerCase().includes(sear.toLowerCase())||use.uname.toLowerCase().includes(sear.toLowerCase())||use.id.toString()===sear)
        setUsers(su);
    },[sear])
    const bg=(id,bool)=>{
        if(id===143)
        return 'Black'
        else if(bool)
        return 'rgb(12, 234, 12)'
        else
        return 'rgb(251,21,21)'
    }
  return (
    <div style={{position:"static",height:"100%"}}>
    <div style={{height:"8%",width:"100%",margin:"auto",marginTop:"1%",color:"white",display:"flex",justifyContent:"space-between"}}>
        <div style={{width:"15%",height:"100%",display:"flex",justifyContent:"space-evenly"}}>
            <div style={{width:"35%",borderRadius:"50%",height:"90%",textAlign:"center"}} onClick={(event)=>setna(true)}><NotificationsIcon color='secondary' style={{width:"90%",height:"90%"}} /></div>
            <div style={{width:"35%",borderRadius:"50%",height:"90%",textAlign:"center"}}><div style={{width:"100%",backgroundColor:"black",borderRadius:"100%",height:"100%",fontSize:"20px",paddingTop:".5px",textShadow:"1px 1px 1px gold",textAlign:"center"}}>F</div></div>
        </div>
        <div style={{width:"60%",height:"90%",display:"flex"}}><input placeholder='Search' onChange={(event)=>setser(event.target.value)} style={{width:"100%",height:"100%",border:"none",outline:"none",backgroundColor:"rgb(31,31,31)",color:"white",fontSize:"20px",boxShadow:"0px 2px 5px 1px black",zIndex:2}} /><Search style={{right:"7%",top:"20%",position:'relative',zIndex:3}}/></div>
    </div>
    <div style={{width:"100%",height:"90%",overflow:"auto"}}>
        {Ausers?.map((users)=>(
            <div key={users.id} style={{width:"97%",margin:"auto",height:"230px",display:"flex",justifyContent:"space-between",marginTop:"2%",marginBottom:"1%",boxShadow:"0px 1px 5px 1px black"}}>
                <div style={{width:"35%",height:"100%"}}>
                    <div style={{width:"70%",margin:"auto",height:"70%",borderRadius:"50%",marginTop:"3%"}}><img style={{width:"100%",height:"100%",backgroundSize:"100%",borderRadius:"50%"}} src={users.profilePic?.url?users.profilePic.url:[profImg.Img]} alt={users.uname} /></div>
                    <div style={{textAlign:"center",color:users.admin?"Gold":"white",fontSize:"18px",marginTop:"3%"}}>{users.name}</div>
                    <div style={{textAlign:"center",color:"white",fontSize:"14px",opacity:.5,marginTop:"1%"}}>{users.uname}</div>
                </div>
                <div style={{width:"55%",height:"100%",color:"white"}}>
                    <div style={{textAlign:"center",height:"15%",fontSize:"17px",marginTop:"2%"}}>Reviews({users.reviews?users.reviews?.length:0})</div>
                    <div style={{height:"75%",overflow:"auto"}}>
                        {users.reviews?.map((rev)=>(
                            <div style={{width:"96%",margin:"auto",marginTop:"2%",marginBottom:"2%",height:"60%",boxShadow:"0px 0px 4px 1px black",display:"flex"}} key={rev.id}>
                                <div style={{width:"30%"}}><p style={{textAlign:"center"}}>BID {rev.id}</p>
                                <div onClick={(event)=>{sbid(rev.Bid);sdel({rid:rev.id,uid:users.id});setds(true)}} style={{width:"35%",height:"25%",borderRadius:"50%",marginLeft:"30%",cursor:"pointer"}}><Delete color='secondary' style={{width:"100%",height:"100%"}} /></div>
                                </div>
                                <div style={{width:"60%",height:"80%",overflow:"auto",marginTop:"2%",padding:"5px",backgroundColor:"rgb(27,27,27)"}}>{rev.review}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{width:"10%",height:"100%",backgroundColor:"rgb(30,30,30)",boxShadow:"0px 0px 4px .5px black"}}>
                    <div style={{width:"60%",height:"17%",borderRadius:"100%",marginTop:"30%",marginLeft:"20%",backgroundColor:bg(users.id,users.admin),color:users.id===143?'gold':'white',fontSize:"25px",textAlign:"center",cursor:"pointer"}} onClick={(event)=>{if(users.id!==143)setad({but:true,data:users})}}>A</div>
                    <div style={{width:"70%",height:"20%",borderRadius:"100%",background:"none",cursor:"pointer",marginTop:"30%",marginLeft:"15%"}} onClick={(event)=>{setms({but:true,data:users})}}><MailIcon color='primary' style={{width:"60%",height:"60%",marginLeft:"20%",marginTop:"10%"}} /></div>
                    <div style={{width:"70%",height:"20%",borderRadius:"100%",marginTop:"30%",marginLeft:"15%",background:"none",cursor:"pointer"}} onClick={(event)=>{setnop(true);setnos({...nosi,id:users.id})}}><NotificationsIcon color='primary' style={{width:"60%",height:"60%",marginLeft:"20%",marginTop:"10%"}} /></div>
                </div>
            </div>
        ))}
        </div>
        {(delsu)?<div style={{width:"200px",height:"100px",top:"300px",right:"700px",position:"absolute",paddingLeft:"40px",borderRadius:"20px",boxShadow:"1px 1px 4px 1px black",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",zIndex:5}}>
        <p style={{fontSize:"18px",color:"white"}}>Are You Sure?</p>
                  <div><button type="button" id='discayes' style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setds(false);}} >No</button><button type="button" id='discano' style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{DeleteReviews(bid,del);setds(false)}}>Yes</button></div>
        </div>:null}
        {(adminaa.but)?<div style={{width:"200px",height:"100px",top:"300px",right:"700px",position:"absolute",paddingLeft:"40px",borderRadius:"20px",boxShadow:"1px 1px 4px 1px black",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",zIndex:5}}>
        <p style={{fontSize:"18px",color:"white"}}>Are You Sure?</p>
                  <div><button type="button" id='discayes' style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setad({...adminaa,but:false});}} >No</button><button type="button" id='discano' style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{AdminChange(adminaa.data);setad({data:{},but:false});window.location.reload()}}>Yes</button></div>
        </div>:null}
        {(mailsend.but)?<div style={{width:"200px",height:"100px",top:"300px",right:"700px",position:"absolute",paddingLeft:"40px",borderRadius:"20px",boxShadow:"1px 1px 4px 1px black",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",zIndex:5}}>
        <p style={{fontSize:"18px",color:"white"}}>Are You Sure?</p>
                  <div><button type="button" id='discayes' style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setms({...mailsend,but:false});}} >No</button><button type="button" id='discano' style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{/*SENDGMAIL(mailsend.data)*/;setms({but:false,data:{}})}}>Yes</button></div>
        </div>:null}
        {(notiall)?<><div style={{width:"40%",height:"60%",margin:"auto",backgroundColor:"rgb(24,24,24)",borderRadius:"20px",position:"absolute",zIndex:6,top:"150px",boxShadow:"0px 0px 4px 1px black",left:"450px"}}>
        <div style={{paddingLeft:"95%",color:"white",cursor:"pointer",fontSize:"25px",textShadow:"1px 1px 2px red"}} onClick={(event)=>{setna(false)}}>×</div>
        <textarea style={{resize:"none",outline:"none",padding:"7px 7px 7px 7px",background:"none",color:"white",borderRadius:"10px",width:"80%",fontSize:"20px",height:"60%",marginTop:"5%",marginLeft:"10%"}} onChange={(event)=>setnoti(event.target.value)} value={noti}></textarea><br/>
        <button type='submit' style={{width:"80px",height:"27px",fontSize:"17px",marginLeft:"45%",marginTop:"2%",border:"none",outline:"none",borderRadius:"10px",backgroundColor:"black",color:"gold",cursor:"pointer"}} onClick={(event)=>{MSGTOALL(noti);setna(false)}}>SEND</button>
        </div></>:null}
        {(notitoparti)?<><div style={{width:"40%",height:"60%",margin:"auto",backgroundColor:"rgb(24,24,24)",borderRadius:"20px",position:"absolute",zIndex:6,top:"150px",boxShadow:"0px 0px 4px 1px black",left:"450px"}}>
        <div style={{paddingLeft:"95%",color:"white",cursor:"pointer",fontSize:"25px",textShadow:"1px 1px 2px red"}} onClick={(event)=>{setnop(false)}}>×</div>
        <textarea style={{resize:"none",outline:"none",padding:"7px 7px 7px 7px",background:"none",color:"white",borderRadius:"10px",width:"80%",fontSize:"20px",height:"60%",marginTop:"5%",marginLeft:"10%"}} onChange={(event)=>setnos({...nosi,msg:event.target.value})} value={nosi.msg}></textarea><br/>
        <button type='submit' style={{width:"80px",height:"27px",fontSize:"17px",marginLeft:"45%",marginTop:"2%",border:"none",outline:"none",borderRadius:"10px",backgroundColor:"black",color:"gold",cursor:"pointer"}} onClick={(event)=>{MSGTOID(nosi.msg,nosi.id);setnop(false)}}>SEND</button>
        </div></>:null}
    </div>
  )
}

export default ManaUsers