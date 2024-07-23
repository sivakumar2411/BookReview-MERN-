import React, { useEffect, useState } from 'react';
import BRIndex from './BRIndex';
import '../assets/Css Files/Reviews.css';
import { getAllDatas } from '../assets/Json Related Things/JSONAPI';
import BookDDD from './BookDDD';
import { Search } from '@mui/icons-material';
import NorthIcon from '@mui/icons-material/North';
import Lottie from 'lottie-react';
import animationData from '../assets/Books/loading lottie.json'

const Reviews = () => {
  const [data,setData]=useState([]);
  const [search,setser]=useState("");
  const [serbo,setserbo]=useState([]);
  const [topbutrev,settopbut]=useState(false);
  const hidelodaer=()=>{
    const loader=document.getElementById("preloader");
    const loader1=document.getElementById("preloaderlottie");
    setTimeout(()=>{
      if(loader)
      loader.style.display="none";
    if(loader1)
      loader1.style.display="none";
    },1000)
  }
  useEffect(()=>{
    const Topvisible=()=>{
      if(window.pageYOffset>500)
      settopbut(true);
      else
      settopbut(false);
    }
    window.addEventListener('scroll',Topvisible);
    return()=>{
      window.removeEventListener('scroll',Topvisible);
    }
  },[])
  const scrolltotop=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  }
  useEffect(()=>
  {
    const fetchdata = async()=>
    {
      await getAllDatas()
      .then((res)=>{setData(res.data);setserbo(res.data);})
      .catch((err)=>console.log(err));
      hidelodaer();
    }
    fetchdata();
  },[])
  useEffect(()=>{
    const sb=data?.filter((book)=>
      book.name.toLowerCase().includes(search.toLowerCase())
    )
    setserbo(sb);
  },[search])
  return (
    <div id='reviewbasediv' style={{width:"100%",position:'absolute'}}>
      <div id='preloader'>
        <Lottie id='preloaderlottie' style={{width:"40%",height:"40%",paddingTop:"20%",margin:"auto"}} animationData={animationData} loop  />
      </div>
        <BRIndex />
        {(topbutrev)?<div id='topbutofreview' onClick={(event)=>scrolltotop()} ><NorthIcon style={{marginLeft:"25%",marginTop:"25%",color:"#F0F2F2"}}/></div>:<></>}
        <div id='reviewsearchbardiv'>
          <input type='text' id='reviewsearchbar' placeholder='Search' onChange={(event)=>{setser(event.target.value)}}/><Search style={{position:"absolute",right:"20px",top:"7px"}}/>
        </div>
        <div id='bookdetailsdynamicdiv' >
          <BookDDD data={serbo}/>
        </div>
    </div>
  )
}
export default Reviews;

