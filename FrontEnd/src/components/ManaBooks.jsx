import React, { useEffect, useState } from 'react'
import { AddForShowCase, DeleteBook, GetShowCaseDatas, RemoveFromShowCase, getAllDatas } from '../assets/Json Related Things/JSONAPI';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import '../assets/Css Files/AdminSettings.css';
import EditIcon from '@mui/icons-material/Edit';
import { Search } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

const ManaBooks = () => {
    const navi=useNavigate();
    const [boo,Boo]=useState(0);
    const [conwar,setCon]=useState(false);
    const [conmsg,setmsg]=useState(true);
    const [BOOKS,setBoo]=useState([]);
    const [Books,setBooo]=useState([]);
    const [showbooks,setSB]=useState([]);
    const [sear,setser]=useState("");
    useEffect(()=>
    {
        const fetch=async()=>{
            const {data:eda}=await getAllDatas();
            setBoo(eda);
            setBooo(eda);
            // const {data:sbb}=await GetShowCaseDatas();
            // setSB(sbb);
        }
        fetch();
    },[conmsg])
    useEffect(()=>{
        const sb=Books?.filter((book)=>book.name.toLowerCase().includes(sear.toLowerCase())||book.id.toString()===sear);
        setBoo(sb);
    },[sear])
    const deletheboo=()=>{
        DeleteBook(boo);
    }
  return (
    <div style={{position:"static",height:"100%"}}>
        <div style={{height:"7%",width:"97%",marginBottom:"2%",margin:"auto",display:"flex",justifyContent:"space-between"}}>
            <div style={{width:"60%",height:"100%",color:"white",display:"flex"}}><input placeholder='Search' onChange={(event)=>setser(event.target.value)} style={{width:"100%",fontSize:"20px",color:"white",height:"100%",border:"none",outline:"none",backgroundColor:"rgb(31,31,31)",boxShadow:"0px 1px 4px 1px black",marginTop:"1%"}} /><Search style={{position:"relative",right:"8%",top:"30%"}}/></div>
        <div style={{fontSize:"22px",width:"10%",borderRadius:"15px",backgroundColor:"blue",textAlign:"center",marginTop:"1%",color:"white",height:"100%",border:"1px groove blue",cursor:"pointer",marginRight:"3%"}} onClick={(event)=>navi('/AddBook')}>New</div>
        </div>
        <div style={{width:"100%",height:"90%",overflow:"auto"}}>
        {(conwar)?<div style={{width:"400px",boxShadow:"1px 1px 5px 1px black",height:"150px",position:"fixed",left:"560px",top:"270px",backgroundColor:"black"}}>
            {(conmsg)?<><div style={{color:"white",position:"relative",fontSize:"23px",left:"110px",top:"35px"}}>Are You Sure?</div>
            <div style={{color:"white",position:"relative",fontSize:"23px",left:"110px",top:"55px"}}><button id='delbutno' onClick={(event)=>{event.preventDefault();Boo(0);setCon(false)}} style={{width:"60px",height:"25px",fontSize:"17px",marginRight:"30px",outline:"none",cursor:"pointer"}}>No</button>
            <button id='delbutyes' onClick={(event)=>{event.preventDefault();deletheboo();setmsg(false)}} style={{width:"60px",outline:"none",height:"25px",fontSize:"17px",cursor:"pointer"}}>Yes</button></div></>:<><div style={{color:"white",position:"relative",fontSize:"23px",left:"90px",top:"45px"}}>Deleted SuccessFully!</div>
            <div style={{color:"white",position:"relative",fontSize:"23px",left:"170px",top:"55px"}}><button id='delbutno' onClick={(event)=>{event.preventDefault();setmsg(true);setCon(false);Boo(0)}} style={{width:"60px",outline:"none",height:"25px",fontSize:"17px",cursor:"pointer"}}>Ok</button></div></>}
        </div>:null}
        {(BOOKS?.length > 0)?BOOKS?.map((books,index)=>(
            <div key={books.id} style={{width:"97%",margin:"auto",height:"40%",boxShadow:"0px 0px 6px 1px black",marginTop:"2%",marginBottom:"3%",display:"flex"}}>
                <div style={{width:"20%",height:"90%",marginTop:"1%",backgroundColor:"gold",marginLeft:"1%",position:"relative"}}>
                    <div style={{width:"20px",height:"20px",position:"absolute"}}><FavoriteIcon onClick={async(event)=>{if(showbooks?.findIndex(({name})=>name===books.name)!==-1){RemoveFromShowCase(books.id);}else{AddForShowCase(books.id)};}} sx={{ color:(showbooks?.findIndex(({name})=>name===books.name)!==-1)?pink['A200']:pink[50] }}/></div>
                    <img src={books.bookCover.url} alt={books.name} style={{width:"100%",height:"100%"}} />
                    </div>
                <div style={{width:"70%",height:"100%",paddingLeft:"80px"}}>
                    <input type='text' style={{border:"none",outline:"none",fontSize:"20px",marginTop:"50px",width:"350px",background:"none",color:"white"}} readOnly value={books.name}></input>
                    <input type='text' style={{border:"none",outline:"none",fontSize:"15px",marginTop:"25px",width:"350px",background:"none",color:"white"}} readOnly value={books.author}></input>
                </div>
                <div style={{width:"8%",height:"100%",position:"relative"}}>
                    <button style={{position:"absolute",top:"30px",width:"40px",height:"40px",border:"none",borderRadius:"50%",cursor:"pointer",outline:"none"}} onClick={(event)=>{navi('/EditBook',{state:books.id})}}><EditIcon color='primary' /></button>
                    <button onClick={(event)=>{event.preventDefault();Boo(books.id);setCon(true)}} style={{position:"absolute",border:"none",bottom:"30px",width:"40px",height:"40px",borderRadius:"50%",outline:"none",cursor:"pointer"}}><DeleteIcon color='secondary'/></button>
                </div>
            </div>
        )):null}
        {(BOOKS?.length===0)?<div key={BOOKS.id} style={{width:"70%",margin:"auto",height:"40%",boxShadow:"0px 0px 6px 1px black",marginTop:"2%",marginBottom:"3%",display:"flex",fontSize:"30px",paddingLeft:"28%",color:"rgb(31,31,31)",textShadow:"1px 2px 1px black",paddingTop:"20%"}}>No Books Found!</div>:null}
        </div>
    </div>
  )
}

export default ManaBooks