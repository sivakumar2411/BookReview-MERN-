import React, { useContext, useEffect, useState } from 'react'
import { Fab, Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../assets/Json Related Things/JSONAPI';
import { UserContext } from './GlobeData';
import '../assets/Css Files/ReviewwithDt.css'

const ReviewwithDt = ({Book,Reviewdata}) => {
    const navi=useNavigate();
    const {LoggedIn,ADOUser}=useContext(UserContext);
    const [hideorshow,setHideorshow]=useState(false);
    const [reviewer,setReviewer]=useState([]);
    const show=()=>
    {
      setHideorshow(!hideorshow);
    }
    const getName =async(revid)=>{
      const response=await getUserById(revid);
      return response.data.name;
    }
    useEffect(()=>{
      const fetchdata=async()=>{
        if(Reviewdata?.length > 0)
        {
          const nameP=Reviewdata?.map(({alterId})=>getName(alterId));
          const promises=await Promise.all(nameP);
          setReviewer(promises);
        }
      }
      fetchdata();
    },[Reviewdata])
    const ReviewTAEvent=()=>{
      if(LoggedIn)
      {
        const exist=Reviewdata?.some((revi)=>revi?.alterId===ADOUser.id);
        if(!exist)
        navi('/Review',{state:Book});
      else
        {
          navi('/ExistReview',{state:{Book,review:Reviewdata.find((revi)=>revi?.alterId===ADOUser.id)}});
        }
      }
      else
      {
        alert("Kindly LogIn");
        navi('/SignIn');
      }
    }
  return (
    <div >
        <Fab id='penciliconbutton' color="secondary" onClick={ReviewTAEvent} aria-label="edit"><EditIcon /></Fab><h2 id='reviewh2tag' onClick={show} style={{cursor:"pointer"}}>Reviews({Array.isArray(Reviewdata) ? Reviewdata.length : 0})</h2>
          {(hideorshow)?
          <div id='reviewdetailsbigdiv'>
            {Array.isArray(Reviewdata) &&
                Reviewdata?.map((review,ind)=>
                (
                    <div key={review.id} id='individiualreviewdetailsdiv' >
                      <div id='reviewnameratingholderdiv'><div id='reviewernamediv' style={{color:"cornsilk",cursor:"pointer",textShadow:"1px 2px 1px black"}}>{reviewer[ind]}</div><div id='individualreviewratingstar' title={review.rating}><Rating name="simple-controlled" precision={0.1} readOnly value={review.rating}/></div></div><br/>
                      <div id='usersreviewdiv' ><p id='usersreview' >{review.review}</p></div>
                    </div>
                ))
            }
            </div>:<p></p>}
    </div>
  )
}

export default ReviewwithDt