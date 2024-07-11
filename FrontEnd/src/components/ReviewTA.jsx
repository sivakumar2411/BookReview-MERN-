import React, { useState, useContext } from 'react';
import '../assets/Css Files/ReviewTA.css';
import  Rating from '@mui/material/Rating';
import  Button  from '@mui/material/Button';
import { AddreviewHistory, UpdateBookRevandUserRH,addBookReview, getUserById,/* getUserDatasbyid*/} from '../assets/Json Related Things/JSONAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './GlobeData';
import { SvgIcon } from '@mui/material';
import { pink } from '@mui/material/colors';

export const Review = () => {
  const location=useLocation();
  const Book=location.state;
  const {ADOUser,Update}=useContext(UserContext);
  // const [curuser,setCuruser]=useState('');
  const [SB,setSB]=useState(false);
  const navi=useNavigate();
  const [value, setValue] = useState(5.00);
  const [newReview,setNewReview]=useState({review:"",rating:5,alterId:ADOUser.id});
  const [revhis,setRevHis]=useState({alterId:Book.id,review:"",rating:5})
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
    const sub=async(event)=>
    {
      event.preventDefault();
      await addBookReview(Book.id,newReview);
      await AddreviewHistory(revhis,ADOUser.id);
      const{data:DData}=await getUserById(ADOUser.id);
      Update(DData);
      setSB(true);
    }
  return (
    <div id='outre'>
      <div id='homebutdiv' title='Home' style={{cursor:"pointer"}} onClick={(event)=>navi("/HomeBR")}><HomeIcon fontSize="large" sx={{ color: pink[500] }} /></div>
      <form onSubmit={sub}>
    <div id='boxre'>
        <h2 id='namere'>Book Review</h2>
        <p id='botre'>Share your thoughts about the Book</p>
        <div id='sxre'>    
        <table id='tabre'><tbody>
            <tr><td><div style={{fontSize:"20px",width:"350px",color:"white"}}>{Book.name}</div></td></tr></tbody></table>
    <table id='onere'><tbody><tr><td>Rating</td></tr></tbody></table>
    <table id='onre'><tbody><tr><td><Rating name="simple-controlled" precision={0.1} value={value} onChange={(event, newValue) => {
    setValue(newValue);setNewReview({...newReview,rating:parseFloat(event.target.value)});setRevHis({...revhis,rating:event.target.value});}}
/></td></tr></tbody></table>
    <table id='twore'><tbody><tr><td><textarea name="name" itemType='textarea' onChange={(event)=>{setNewReview({...newReview,review:event.target.value});setRevHis({...revhis,review:event.target.value})}} required id="reviewtext" cols="38.5" rows="6" placeholder='Write your review here' style={{fontSize:'17px',color:"white",background:"none",resize:"none"}}/></td></tr>
    </tbody></table></div>
    <Button variant="outlined" color="error" id='Btre' type='submit'>Submit Review</Button>
    </div></form>
    {SB?(<div style={{position:"absolute",paddingLeft:"10px",width:"400px",height:"70px",display:"flex",bottom:"0px",background:"#f57c00",color:"white",fontSize:"25px",cursor:"pointer",paddingBottom:"10px",borderRadius:"10px"}}><p>Review Submitted Successfully<button onClick={(event)=>{setSB(false);navi('/Reviews')}} style={{cursor:"pointer",fontSize:"30px",color:"black",border:"none",background:"none",marginLeft:"25px"}}>×</button></p></div>):<p></p>}
    </div>
  )
}




export const ExistReview = () => {
  const location=useLocation();
  const {state:{Book,review}}=location;
  const {ADOUser,Update}=useContext(UserContext);
  // const [curuser,setCuruser]=useState('');
  const [SB,setSB]=useState(false);
  const navi=useNavigate();

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
    const [newReview,setNewReview]=useState({review:review.review,rating:review.rating,alterId:ADOUser.id});
    const [revhis,setRevHis]=useState({alterId:Book.id,review:review.review,rating:review.rating})
    const sub=async(event)=>
    {
      event.preventDefault();
      await UpdateBookRevandUserRH(newReview,revhis);
      const{data:DData}=await getUserById(ADOUser.id);
      Update(DData);
      setSB(true);
    }
  return (
    <div id='outre'>
      <div id='homebutdiv' title='Home' style={{cursor:"pointer"}} onClick={(event)=>navi("/HomeBR")}><HomeIcon fontSize="large" sx={{ color: pink[500] }} /></div>
      <form onSubmit={sub}>
    <div id='boxre'>
        <h2 id='namere'>Book Review</h2>
        <p id='botre'>Share your thoughts about the Book</p>
        <div id='sxre'>    
        <table id='tabre'><tbody>
            <tr><td><div style={{fontSize:"20px",width:"350px",color:"white"}}>{Book.name}</div></td></tr></tbody></table>
    <table id='onere'><tbody><tr><td>Rating</td></tr></tbody></table>
    <table id='onre'><tbody><tr><td><Rating name="simple-controlled" precision={0.1} value={revhis.rating} onChange={(event, newValue) => {
    setNewReview({...newReview,rating:parseFloat(event.target.value)});setRevHis({...revhis,rating:event.target.value});}}
/></td></tr></tbody></table>
    <table id='twore'><tbody><tr><td><textarea name="name" itemType='textarea' onChange={(event)=>{setNewReview({...newReview,review:event.target.value});setRevHis({...revhis,review:event.target.value})}} required id="reviewtext" cols="38.5" rows="6" value={revhis.review} style={{fontSize:'17px',color:"white",background:"none",resize:"none"}}/></td></tr>
    </tbody></table></div>
    <Button variant="outlined" color="error" id='Btre' type='submit'>Submit Review</Button>
    </div></form>
    {SB?(<div style={{position:"absolute",paddingLeft:"10px",width:"400px",height:"70px",display:"flex",bottom:"0px",background:"#f57c00",color:"white",fontSize:"25px",cursor:"pointer",paddingBottom:"10px",borderRadius:"10px"}}><p>Review Submitted Successfully<button onClick={(event)=>{setSB(false);navi('/Reviews')}} style={{cursor:"pointer",fontSize:"30px",color:"black",border:"none",background:"none",marginLeft:"25px"}}>×</button></p></div>):<p></p>}
    </div>
  )
}