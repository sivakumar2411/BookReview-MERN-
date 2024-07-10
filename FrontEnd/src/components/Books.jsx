import React, { useEffect, useState } from 'react'
import { getAllDatas,/* getAllgenres*/} from '../assets/Json Related Things/JSONAPI';
import BRIndex from './BRIndex';
import RatingStar from './RatingStar';
import '../assets/Css Files/Books.css';
// import { Search } from '@mui/icons-material';
import NorthIcon from '@mui/icons-material/North';
import { Genres } from './BRDatas';
import Lottie from 'lottie-react';
import animationData from '../assets/Books/loading lottie.json'
// import { Book ,FlashOn,Lightbulb,Castle,Favorite,Museum,Explore,Whatshot,DarkMode,Gavel,Theaters,EmojiEmotions} from '@mui/icons-material';
// import { pink ,green,yellow,grey,orange} from '@mui/material/colors';

const BOOKS = () => {
    const [data,setData]=useState([]);
    const [Data,setDData]=useState([]);
    // const [gendata,setGendata]=useState([]);
    const [sear,setser]=useState("");
    const [genreofbook,setGenreofbook]=useState("all");
    const [topbutbooks,settbb]=useState(false);

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
        const TopButVisi=()=>{
            if(window.pageYOffset>500)
            settbb(true);
            else
            settbb(false);
        }
        
        window.addEventListener('scroll',TopButVisi);
        return()=>{
            window.removeEventListener('scroll',TopButVisi);
        }
    },[])
    const scrolltotop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }

    // const renderTheIcon=(Iconcomponent)=>
    // {
    //     return eval(Iconcomponent);
    // }
    useEffect(()=>
    {
        const fetchdata=async()=>{
            try
            {
                const response=await getAllDatas();
                setDData(response.data);
                setData(response.data);
                hideloader();
            }
            catch(e)
            {console.log("Error:",e);}
        }
        fetchdata();
    },[])
    useEffect(()=>{
        const filboo=Data.filter((book)=>
        book.name.toLowerCase().includes(sear.toLowerCase()) && book.genre[genreofbook]);
        setData(filboo);
    },[sear])
    useEffect(()=>{
        const filboo=Data.filter(book=>
            book.name.toLowerCase().includes(sear.toLowerCase()) && book.genre[genreofbook]);
        setData(filboo);
    },[genreofbook])
  return (
    <div style={{width:"100%",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",minHeight:"100vh",color:"white",position:"absolute"}}>
        <div id='preloader'>
        <Lottie id='preloaderlottie' style={{width:"40%",height:"40%",paddingTop:"20%",margin:"auto"}} animationData={animationData} loop  />
      </div>
        <BRIndex />
        {(topbutbooks)?<div id='topbutofbooks' onClick={(event)=>scrolltotop()}><NorthIcon style={{marginLeft:"25%",marginTop:"25%",color:"#F0F2F2"}}/></div>:<></>}
        <div id='BooksAllBookHolderdiv'>
            <div id='searchandgenreselectordiv'>
            <input type='text' id='Searchbaronbookspage' onChange={(event)=>setser(event.target.value)} placeholder='Search' />{/*<Search id="serachicononbookspage"/>*/}
            <select id='GenreSelcetoronbooks' onChange={(event)=>{setGenreofbook(event.target.value);}}>
                {Object.keys(Genres)?.map((index)=>(
                    <option id='Genreoptionbooks' key={index} defaultValue={Genres[index]==='all'}  value={Genres[index]}>
                        {Genres[index].charAt(0).toUpperCase()+Genres[index].slice(1)}</option>))}
                </select>
            </div>
            {/* <div id='genreholderdivonbookspage' >
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    {gendata.map((gen)=>
                            <div id="bookselectionbut" title={gen.bookids?gen.bookids.length:0+" Books"} style={{height:"30px",minWidth:"72px",borderRadius:"10px",textAlign:"center"}} onClick={(event)=>setGenreofbook(gen.genname)} key={gen.id}>{gen.genname}</div>
                        )}
                </div>
            </div> */}
        {data?.map((book)=>
        (
                <div key={book.id} id='dynamicbooksholdingdiv'>
                <div id='dynamicbookimageholder' ><img src={book.bookCover.url} alt={book.name} style={{width:"100%",height:"100%"}}></img></div>
                <div id='descriptionratingholderdiv'>
                    <div style={{display:"flex"}}><p id='bookauthor'>Author</p><p id='bookauthorname'><b>{book.author}</b></p></div>
                    <div id='bookdescription'>{book.description}</div>
                    <div>
                        <p id='bookreviewandrating'>Reviews & Ratings ({book.reviews?.length})</p>
                        <div id='bookreviewratingstaronbookspage'><RatingStar reviews={book.reviews} /></div>
                    </div>
                </div>
                <div id='booknameonbookpage'>{book.name}</div>
            </div>
        ))}
        {(data?.length===0)?<>
            <div id='nobooksfounddiv' >No Books Found!</div>
        </>:null}
    </div>
    </div>
  )
}

export default BOOKS