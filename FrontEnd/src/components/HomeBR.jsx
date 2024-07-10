import React, { useContext, useEffect, useState } from 'react'
import BRIndex from './BRIndex'
// import { showcase } from './BRDatas'
// import BackgroundShowCase from './BackgroundShowCase';
import '../assets/Css Files/HomeBR.css';
import { UserContext } from './GlobeData';
import { GetShowCaseDatas, getBookDatasbyid, getRecBooks } from '../assets/Json Related Things/JSONAPI';
import Lottie from 'lottie-react';
import animationData from '../assets/Books/loading lottie.json'
import { Genres } from './BRDatas';

const HomeBR = () => {
  const{LoggedIn,ADOUser}=useContext(UserContext);
  const [sugBook,setsb]=useState([]);
  const [varri,setV]=useState(0);
  const [ShowCaseData,setSCD]=useState([]);
  const [ShowBooks,setShowBooks]=useState(0);
  const [td,settd]=useState(null);

  useEffect(()=>{
    if(LoggedIn)
    {
    //   const fetchG=async()=>{
    //     const NBI=[];
    //     const GEN=Genres;
    //     var idd=1;
    //     Object.keys(GEN)?.map((gen,index)=>{
    //       if(ADOUser.intrestedGenres[gen])
    //       {
    //         for(const bid of gen.bookids)
    //         {
    //           const BidExist=NBI?.findIndex((boo)=>boo.BID===bid);
    //           if(BidExist===-1)
    //           {
    //             const Boo={id:idd,BID:bid,Int:1};
    //             idd+=1;
    //             NBI.push(Boo);
    //           }
    //           else
    //           NBI[BidExist].Int+=1;
    //         }
    //       }
    //     })
    //     NBI.sort((a,b)=>b.Int-a.Int);
    //     const NNBI=NBI.slice(0,9);
    //     const BD=NNBI?.map(async(BI)=>{
    //       const{data:bd}=await getBookDatasbyid(BI.BID);
    //       return bd;
    //     })
    //     const Promises=await Promise.all(BD);
    //     setsb(Promises);
    //     console.log(sugBook);
    //     setV(1);
    //   }
    //   fetchG();
    const fetch = async()=>{
      console.log(ADOUser.intrestedGenres)
    await getRecBooks(ADOUser.intrestedGenres)
    .then((res)=>{setsb(res.data);});
    setV(1);}
    fetch();
    }
  },[])
  useEffect(()=>{
  },[varri])

  const hideloader=()=>{
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
    
    const fetchshowcasedata=async()=>
    {
      // const{data:showcada}=await GetShowCaseDatas();
      //   const Promises=await Promise.all(showcada);
      //   setSCD([...Promises]);
      //   setV(1);
      //   setShowBooks(0);
      hideloader();
    }

    fetchshowcasedata();

  },[])

  useEffect(() => {
    const td = setInterval(() => {
      setShowBooks((prev) => (prev + 1) % ShowCaseData?.length);
    }, 5000);
    settd(td);
    return () => clearInterval(td);
  }, [ShowCaseData]);

  const currentShow = ShowCaseData && ShowCaseData.length > 0 ? ShowCaseData[ShowBooks] : null;

  const BookClickEvent = (index) => {
    setShowBooks(index);
    clearInterval(td); 
    const ttd = setInterval(() => { 
      setShowBooks((prev) => (prev + 1) % ShowCaseData?.length);
    }, 5000);
    settd(ttd);
    const smallshowElements = document.querySelectorAll('.smallshow');
    let a=0;
    for (let i = index; i < smallshowElements?.length; i++) 
    {
      const element = smallshowElements[i];
      element.classList.remove('smallshow');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('smallshow');
      element.style.animationDelay = `${a*5}s`;
      a+=1;
    }
    for (let i = 0; i < index; i++) 
    {
      const element = smallshowElements[i];
      element.classList.remove('smallshow');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('smallshow');
      element.style.animationDelay = `${a*5}s`;
      a+=1;
    }
  };

  return (
    <div id='homebasediv'>
    <div id="homesecondbasediv">
      <div id='preloader'>
        <Lottie id='preloaderlottie' style={{width:"40%",height:"40%",paddingTop:"20%",margin:"auto"}} animationData={animationData} loop  />
      </div>
        <BRIndex />
        <div id='pillarofshowcase'>
          <div id='bigshow'><span></span>
            {
              <img id='bigshowimage' src={currentShow?.img} alt={currentShow?.name} title={currentShow?.name}  />
              // <BackgroundShowCase IIMMAA={showcase}/>
            }
          </div>
          <div id='smallsobox'>
          {
              ShowCaseData?.map((data,index)=>
              (
                  <div id='smallshow' key={data.id} onClick={(event)=>BookClickEvent(index)}>
                  <div><img id='smallshowbookimage' src={data.img} alt={data.name}/></div>
                  <div id='smallshowbookdetail' ><p>{data.name}</p></div>
                  <div className='smallshow' style={{animationDelay: `${index * 5}s`}}></div>
                  </div>
              ))
            }
          </div>
        </div>
    </div>
        {(LoggedIn&&varri===1)?<div id='recommendedbookbygenre' >
            {sugBook?.slice(0,9).map((Book,index)=>(
              <div id='rbbgmaindiv'  key={index}>
                <div id='rbbgimagediv'><img src={Book.bookCover.url} style={{width:"100%",height:"100%"}} alt={Book.name} /></div>
                <div id='rbbgdescdiv' >{Book.description}</div>
                <div id='rbbgnamediv' >{Book.name}</div>
              </div>
            ))}
        </div>:null}
        </div>
  )
}

export default HomeBR