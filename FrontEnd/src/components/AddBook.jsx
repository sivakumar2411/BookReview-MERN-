import React, { useEffect, useState } from 'react';
import '../assets/Css Files/AddBook.css';
import { AddNewBook, DeleteReviews, getBookDatasbyid, updatebookDT } from '../assets/Json Related Things/JSONAPI';
import '../assets/Css Files/AdminSettings.css'
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const AddBook = () => {
    const[selgen,chgen]=useState(false);
    const [bookDts,setDts]=useState({name:"",author:"",description:"",r_Rated:false,genre: {philosophy: false,action: false,fiction: false,romance: false,history: false,nonFiction: false,selfHelpBook: false,biography: false,horror: false,politics: false,comic: false,fantasy: false,all: true}})
    const bookcover=(event)=>{
        const file=event.target.files[0];
        const reader=new FileReader();
        if(file)
        {
            reader.onloadend=()=>{
            setDts({...bookDts,bookCover:{url:reader.result}})
            }
            reader.readAsDataURL(file);
        }
    }
  return (
    <div style={{width:"100%",height:"100vh",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",position:"fixed"}}>
        <div style={{width:"500px",height:"550px",boxShadow:"1px 2px 7px 2px black",borderRadius:"10px 10% 10px 10%",background:"rgb(31,31,31)",color:"white",margin:"auto",marginTop:"60px",paddingTop:"50px",paddingLeft:"30px"}}>
        <form onSubmit={(event)=>{event.preventDefault();AddNewBook(bookDts);}}>
        <div>
            <table style={{fontSize:"25px"}} id='newbtab'>
                <tbody>
                    <tr><td><label>Book</label></td><td><input type='text' style={{width:"250px",height:"30px",fontSize:"20px",border:"none",outline:"none",borderRadius:"0px 0px 20px 0px"}} required onChange={(event)=>setDts({...bookDts,name:event.target.value})}></input></td></tr>
                    <tr><td><label>Author</label></td><td><input style={{width:"250px",height:"30px",fontSize:"20px",outline:"none",border:"none",borderRadius:"0px 0px 20px 0px"}} type='text' required onChange={(event)=>setDts({...bookDts,author:event.target.value})}></input></td></tr>
                    <tr><td style={{width:"140px"}}><label>Description</label></td><td><textarea required cols={30} rows={10} style={{overflow:"auto",outline:"none",border:"none",borderRadius:"0px 0px 30px 0px",fontSize:"17px"}} onChange={(event)=>setDts({...bookDts,description:event.target.value})}></textarea></td></tr>
                    <tr><td><label>R-Rated</label></td><td><input type="checkbox" checked={bookDts['R-Rated']} style={{cursor:"pointer",width:"18px",height:"18px"}}  onChange={(event)=>setDts({...bookDts,r_Rated:!bookDts['R-Rated']})}></input>Yes</td></tr>
                    <tr><td><label>Book Cover</label></td><td><input type='file' accept='image/*' onChange={bookcover}/></td></tr>
                </tbody>
            </table>
            {(selgen)?(<div style={{width:"600px",height:"400px",position:"absolute",top:"150px",borderRadius:"20px",background:"rgb(22,22,22)",left:"468px"}}>
            <div style={{width:"600px",height:"300px",display:"flex",paddingTop:"20px",flexWrap:"wrap",justifyContent:"space-evenly",}}>
            {Object.keys(bookDts.genre).map((Genre,index)=>
                <div key={index}>
                    {(Genre!=='all')?<button style={{minWidth:"190px",outline:"none",border:"none",boxShadow:"1px 1px 4px 1px black",borderRadius:"10px",fontSize:"26px",minHeight:"60px",cursor:"pointer",color:"white",backgroundColor:bookDts.genre[Genre]?"rgb(22, 188, 28)":"orange"}} onClick={(event)=>{event.preventDefault();setDts((prevdts)=>({...prevdts,genre:{...prevdts.genre,[Genre]:!prevdts.genre[Genre]}}))}}>{Genre}</button>:null}</div>
            )}</div>
            <button id='selgenok' style={{width:"150px",height:"60px",cursor:"pointer",fontSize:"32px",position:"absolute",left:"225px",borderRadius:"25px",outline:"none"}} onClick={(event)=>{event.preventDefault();chgen(false)}}>Ok</button>
            </div>):null}
            <div style={{width:"200px",height:"50px",margin:"auto",marginTop:"30px",borderRadius:"20px"}}><button id='newbookgen' style={{width:"200px",fontSize:"25px",borderRadius:"20px",outline:"none",height:"50px",cursor:"pointer"}} onClick={(event)=>{event.preventDefault();chgen(true)}}>Select Genres</button></div>
        <div style={{width:"100px",height:"40px",margin:"auto",marginTop:"30px",borderRadius:"15px"}}><button type="submit" id='newbooksub' style={{width:"100px",fontSize:"18px",height:"40px",margin:"auto",borderRadius:"15px",outline:"none",cursor:"pointer"}}>Submit</button></div>
        </div>
        </form>
        </div>
    </div>
  )
}

export default AddBook


export const EditBook = () => {
    const[selgen,chgen]=useState(false);
    const[editrev,showrev]=useState(false);
    const[delrev,showdr]=useState(false);
    const[delmsg,showmsg]=useState(false);
    const [bookDts,setDts]=useState({});
    const [delerev,setid]=useState();
    const location=useLocation();
    const BookId=location.state;
    useEffect(()=>{
        const fetch=async()=>{
            await getBookDatasbyid(BookId)
            .then((res)=>setDts(res.data));
        }
        fetch();
    },[])
    const bookcover=(event)=>{
        const file=event.target.files[0];
        const reader=new FileReader();
        if(file)
        {
            reader.onloadend=()=>{
            setDts({...bookDts,bookCover:{url:reader.result}})
            }
            reader.readAsDataURL(file);
        }
    }
    useEffect(()=>{
        console.log(delerev);
    },[delrev])
  return (
    <div style={{width:"100%",height:"100vh",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",position:"fixed"}}>
        <div style={{width:"500px",height:"550px",boxShadow:"1px 2px 7px 2px black",borderRadius:"10px 10% 10px 10%",background:"rgb(31,31,31)",color:"white",margin:"auto",marginTop:"60px",paddingTop:"50px",paddingLeft:"30px"}}>
        <form onSubmit={(event)=>{event.preventDefault();updatebookDT(bookDts);alert("Updated SuccessFully!");}}>
        <div>
            <table style={{fontSize:"25px"}} id='newbtab'>
                <tbody>
                    <tr><td><label>Book</label></td><td><input type='text' style={{width:"250px",height:"30px",fontSize:"20px",border:"none",outline:"none",borderRadius:"0px 0px 20px 0px"}} required onChange={(event)=>setDts({...bookDts,name:event.target.value})} value={bookDts.name}></input></td></tr>
                    <tr><td><label>Author</label></td><td><input style={{width:"250px",height:"30px",fontSize:"20px",outline:"none",border:"none",borderRadius:"0px 0px 20px 0px"}} type='text' required onChange={(event)=>setDts({...bookDts,author:event.target.value})} value={bookDts.author}></input></td></tr>
                    <tr><td style={{width:"140px"}}><label>Description</label></td><td><textarea required cols={30} rows={10} style={{overflow:"auto",outline:"none",border:"none",borderRadius:"0px 0px 30px 0px",fontSize:"17px"}} onChange={(event)=>setDts({...bookDts,description:event.target.value})} value={bookDts.description}></textarea></td></tr>
                    <tr><td><label>R-Rated</label></td><td><input type="checkbox" checked={bookDts['r_Rated']} style={{cursor:"pointer",width:"18px",height:"18px"}}  onChange={(event)=>setDts({...bookDts,r_Rated:!bookDts['r_Rated']})}></input>Yes</td></tr>
                    <tr><td><label>Book Cover</label></td><td><input type='file' accept='image/*' onChange={bookcover} /></td></tr>
                </tbody>
            </table>
            {(selgen)?(<div style={{width:"600px",height:"400px",position:"absolute",top:"150px",borderRadius:"20px",background:"rgb(22,22,22)",left:"468px"}}>
            <div style={{width:"600px",height:"300px",display:"flex",paddingTop:"20px",flexWrap:"wrap",justifyContent:"space-evenly",}}>
            {Object.keys(bookDts.genre).map((Genre,index)=>
                <div key={index}>
                    {(Genre!=='all')?<button style={{minWidth:"190px",outline:"none",border:"none",boxShadow:"1px 1px 4px 1px black",borderRadius:"10px",fontSize:"26px",minHeight:"60px",cursor:"pointer",color:"white",backgroundColor:bookDts.genre[Genre]?"rgb(22, 188, 28)":"orange"}} onClick={(event)=>{event.preventDefault();setDts((prevdts)=>({...prevdts,genre:{...prevdts.genre,[Genre]:!prevdts.genre[Genre]}}))}}>{Genre}</button>:null}</div>
            )}</div>
            <button id='selgenok' style={{width:"150px",height:"60px",cursor:"pointer",fontSize:"32px",position:"absolute",left:"225px",borderRadius:"25px",outline:"none"}} onClick={(event)=>{event.preventDefault();chgen(false)}}>Ok</button>
            </div>):null}
            <div style={{width:"200px",height:"50px",margin:"auto",marginTop:"30px",borderRadius:"20px"}}><button id='newbookgen' style={{width:"200px",fontSize:"25px",borderRadius:"20px",outline:"none",height:"50px",cursor:"pointer"}} onClick={(event)=>{event.preventDefault();chgen(true)}}>Select Genres</button></div>
            <div style={{width:"250px",height:"50px",margin:"auto",marginTop:"30px",borderRadius:"20px",display:"flex",justifyContent:"space-between"}}><button id='newbookgen' style={{width:"100px",fontSize:"18px",borderRadius:"15px",height:"40px",outline:"none",cursor:"pointer"}} title={bookDts.reviews?.length} onClick={(event)=>{event.preventDefault();showrev(true)}}>Reviews</button><button type="submit" id='newbooksub' style={{width:"100px",fontSize:"18px",height:"40px",borderRadius:"15px",outline:"none",cursor:"pointer"}}>Update</button></div>
            {(editrev)?
            <><div style={{width:"400px",height:"550px",border:"1px groove red",position:"absolute",left:"570px",top:"90px",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))"}}>
                <div style={{position:"relative",left:"140px",fontSize:"30px",top:"20px"}}>Reviews</div>
                <div style={{width:"350px",height:"400px",margin:"auto",border:"1px groove blue",position:"relative",top:"30px",overflow:"auto"}}>
                {bookDts.reviews?.map((revi)=>(
                    <div style={{width:"350px",height:"100px"}} key={revi.id}>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                        <div style={{width:"150px",height:"100%",fontSize:"20px"}}><div style={{marginTop:"30px",marginBottom:"10px"}}>{revi.alterId}</div><div>{revi.review}</div></div>
                        <button style={{width:"35px",height:"35px",marginTop:"40px",outline:"none",border:"none",borderRadius:"100%"}} onClick={(event)=>{event.preventDefault();setid(revi.alterId);showdr(true)}}><DeleteIcon/></button>
                        {(delrev)?<><div style={{width:"250px",height:"100px",border:"1px groove blue",paddingTop:"30px",top:"90px",position:"absolute",background:"linear-gradient(rgb(20, 20, 20),rgb(17,17,17))",paddingLeft:"80px"}}>
                            {(delmsg)?<><div style={{fontSize:"20px",paddingBottom:"10px",marginRight:"60px"}}>Deleted Successfully!</div><button onClick={(event)=>{event.preventDefault();showdr(false);showmsg(false)}} style={{width:"50px",height:"30px",fontSize:"15px",marginLeft:"50px",outline:"none",border:"none",cursor:"pointer"}}>Done</button></>:(<><div style={{fontSize:"20px",paddingBottom:"10px"}}>Are you Sure?</div><div><button onClick={(event)=>{event.preventDefault();showdr(false)}} style={{width:"50px",height:"30px",fontSize:"15px",outline:"none",border:"none",cursor:"pointer"}}>No</button><button onClick={(event)=>{event.preventDefault();showmsg(true);DeleteReviews(BookId,delerev)}} style={{marginLeft:"40px",width:"50px",height:"30px",fontSize:"15px",outline:"none",border:"none",cursor:"pointer"}}>Yes</button></div></>)}</div></>:null}
                        </div>
                    </div>
                ))}</div>
            </div></>:null}
        </div>
        </form>
        </div>
    </div>
  )
}