import React, { useContext, useEffect, useState } from 'react'
import '../assets/Css Files/Profile.css'
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { UserContext } from './GlobeData';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DeleteRevFromBook, UpdateReviewHisandRev, UpdateUser, getBookDatasbyid } from '../assets/Json Related Things/JSONAPI';
import { Rating, SvgIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Genres, profImg } from './BRDatas';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export const Profile = () => {
  // const [src,setSrc]=useState(null);
  // const [crop,setCrop]=useState({aspect:16/9});
  // const [ci,setci]=useState(null);
  const {ADOUser,Update}=useContext(UserContext);
  const[UserDatas,setUD]=useState(ADOUser);
  const[Edit,setEdit]=useState([]);
  const[Friends,setFri]=useState([]);
  // const[Genres,setgenre]=useState([]);
  const Regions=[{id:1,Reg:"Asia"},{id:2,Reg:"Africa"},{id:3,Reg:"North America"},{id:4,Reg:"South America"},{id:5,Reg:"Europe"},{id:6,Reg:"Australia"}];
  const [info,Setinfo] = useState(true);
  const [history,Sethistory] = useState(false);
  const [cedit,setce]=useState(false);
  const [dischng,setdc]=useState(false);
  const [savechng,setsc]=useState(false);
  const [unfri,setuf]=useState(false);
  const [biolen,setbl]=useState(false);
  const [unlen,setun]=useState(false);
  const [Nlen,setN]=useState(false);
  const [showfri,setsf]=useState(false);
  const [showsvrev,setsvrev]=useState(false);
  const [showddrev,setddrev]=useState(false);
  const [showdelrev,setdelrev]=useState(false);
  const[BoNa,setBoo]=useState([]);
  const[DID,setdid]=useState(0);
  const[DBID,setdbid]=useState(0);
  const navi=useNavigate();
  useEffect(()=>
  {
    if(UserDatas.reviews)
    {const EditArray = Array.from({ length: UserDatas.reviews.length }, () => false);
        setEdit(EditArray);}
    // const fetchfri=async()=>{
      // var Fdatas=[];
      // UserDatas.FriendList?.filter(async(fri)=>
      // {
      //   await getFriendName(fri.friendid)
      //   .then((res)=>Fdatas.push({Name:res.data.Name,id:fri.id,chatid:fri.chatid}));
      // })
      // setFri(Fdatas);
    // }
    // fetchfri();
    // const fetchgen=async()=>{
    //   await getAllgenres()
    //   .then((res)=>setgenre(res.data));
    // }
    // fetchgen();

    const fetchBN=async()=>{
      if(UserDatas.reviews?.length > 0)
      {
        const Bname=UserDatas?.reviews?.map(({alterId})=>BookName(alterId));
        const promises=await Promise.all(Bname);
        setBoo(promises);
      }
    }
    fetchBN();
  },[DID])
  useEffect(()=>{
    if(DID!==0)
    {
      UpdateUser(UserDatas);
      Update(UserDatas);
      DeleteRevFromBook(DBID,UserDatas.id);
      setdid(0);
      setdbid(0);
    }
  },[UserDatas])
  const BookName=async(id)=>{
    const{data:Bdata}=await getBookDatasbyid(id);
    return Bdata.name;
  }
  const DelRev=()=>{
    setUD(prD=>{
    const Nrev=UserDatas.reviews.filter((revi)=>revi.id!==DID);
    return {...prD,reviews:Nrev};})
  }
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  const ProfileImage=(event)=>{
    const file=event.target.files[0];
    const reader=new FileReader();
    if(file)
    {
      reader.onloadend=()=>{
        setUD({...UserDatas,profilePic:{url:reader.result}})
      }
      reader.readAsDataURL(file);
    }
  }
  return (
    <div  className='totalpp'>
        <div id='homebutdiv' title='Home' style={{cursor:"pointer"}} onClick={(event)=>navi("/HomeBR")}><HomeIcon fontSize="large" sx={{ color: pink[500] }} /></div>
        <div id='leftpp'>
          <div id='lefttoppp'>
          <div className='cpp'><div id='circlepp'><span></span>
          {(cedit)?<><label htmlFor='profimginput' style={{zIndex:1,cursor:"pointer"}}><input id='profimginput' type="file" style={{width:0,height:0,overflow:"hidden",position:"absolute"}} accept='image/*' onChange={ProfileImage} /><img src={UserDatas.profilePic?.url?UserDatas.profilePic.url:[profImg.Img]} alt={UserDatas.uname} style={{zIndex:2,fontSize:"10px",backgroundSize:"100%",width:"125px",height:"125px",borderRadius:"50%",opacity:0.3}}/></label><AddAPhotoIcon style={{position:"absolute",zIndex:12}}/></>
          :<img src={UserDatas.profilePic?.url?UserDatas.profilePic.url:[profImg.Img]} alt={UserDatas.uname} style={{zIndex:2,fontSize:"10px",backgroundSize:"100%",width:"97%",height:"97%",borderRadius:"50%"}} />}
          </div></div>
          <div id='namepp' style={{color:(ADOUser.admin)?((ADOUser.id===143)?"gold":"rgb(55,255,0)"):"white"}}>{ADOUser.name}</div>
          <div id='usernamepp' style={{opacity:.7}}>{ADOUser.uname}</div></div>
        <div id='leftbottompp'>
          <ul style={{marginTop:"10px"}}>
            <li onClick={(event)=>{Setinfo(true);Sethistory(false)}} style={{marginTop:'15px',fontSize:"25px"}}>Personal Info</li>
            <li style={{marginTop:'15px',fontSize:"25px"}} onClick={(event)=>{Setinfo(false);Sethistory(true)}}>Review History</li>
          </ul>
        </div></div>
        <div id='rightpp' style={{color:"white"}}>
          {(info)?<>
          <form onSubmit={(event)=>{setsc(false);setce(false);UpdateUser(UserDatas);Update(UserDatas)}}>
          <div id='profiledetailsholderdivonpp'>
            <div>
            <div id='profilelablediv'><p id='profilelablepara'>UserName</p><input minLength={4} required maxLength={23} id='profilevalinput' style={{border:cedit?"1px groove":"none",outline:cedit?"":"none",background:"none",color:"white"}} value={UserDatas.uname} onChange={(event)=>setUD({...UserDatas,uname:event.target.value})} readOnly={!cedit} onFocus={(event)=>setun(true)} onBlur={(event)=>setun(false)}/>{(unlen&&cedit)?<p style={{fontSize:"12px",position:"absolute",top:"25px",zIndex:1,color:23-UserDatas.uname.length===0?"orangered":"",right:"7px"}}>{23-UserDatas.uname.length}</p>:null}</div>
            <div id='profilelablediv'><p id='profilelablepara'>Name</p><input minLength={4} required maxLength={23} id='profilevalinput' style={{background:"none",border:cedit?"1px groove":"none",outline:cedit?"":"none",color:"white"}} value={UserDatas.name} onChange={(event)=>setUD({...UserDatas,name:event.target.value})} readOnly={!cedit} onFocus={(event)=>setN(true)} onBlur={(event)=>setN(false)}/>{(Nlen&&cedit)?<p style={{fontSize:"12px",position:"absolute",top:"15px",zIndex:1,color:23-UserDatas.Name.length===0?"orangered":"",right:"7px"}}>{23-UserDatas.name.length}</p>:null}</div>
            <div id='profilelablediv'><p id='profilelablepara'>Gender</p><p >{UserDatas.gender}</p>{(cedit)?<><select id='profileselector' onClick={(event)=>{event.preventDefault();setUD({...UserDatas,gender:event.target.value})}} >
              <option selected={(UserDatas.gender==="Male")} >Male</option>
              <option selected={(UserDatas.gender==="Female")}>Female</option>
            </select>
            </>:null}</div>
            <div id='profilelablediv'><p id='profilelablepara'>Region</p><p>{UserDatas.region}</p>{(cedit)?<><select id='profileselector'  onClick={(event)=>{event.preventDefault();setUD({...UserDatas,region:event.target.value});}}>
              <option selected={(UserDatas.region)==="Asia"}>Asia</option>
              <option selected={(UserDatas.region)==="Africa"}>Africa</option>
              <option selected={(UserDatas.region)==="Australia"}>Australia</option>
              <option selected={(UserDatas.region)==="Europe"}>Europe</option>
              <option selected={(UserDatas.region)==="North America"}>North America</option>
              <option selected={(UserDatas.region)==="South America"}>South America</option>
            </select>
            </>:null}</div>
            <div id='profilelablediv'><p id='profilelablepara'>Bio</p><textarea required maxLength={40} id='profilevalinput' className='bio' style={{border:cedit?"1px groove":"none",outline:cedit?"":"none",resize:"none",background:"none",color:"white"}} value={UserDatas.bio} onChange={(event)=>setUD({...UserDatas,bio:event.target.value})} readOnly={!cedit} onFocus={(event)=>setbl(true)} onBlur={(event)=>setbl(false)}  />{(biolen&&cedit)?<p style={{fontSize:"12px",position:"absolute",top:"9px",zIndex:1,color:40-UserDatas.bio.length===0?"orangered":"",right:"7px"}}>{40-UserDatas.bio.length}</p>:null}</div>
            {(cedit)?<><div id='editicondivonprofiledet' className='saveiconprodet' title='Save' onClick={(event)=>{setsc(true);setdc(false)}}><Fab color='secondary'><BookmarkAddedIcon/></Fab></div>
            <div id='editicondivonprofiledet' title='Discard' onClick={(event)=>{setdc(true);setsc(false)}}><Fab color='secondary'><ClearIcon/></Fab></div></>
            :<div id='editicondivonprofiledet' title='Edit' onClick={(event)=>setce(true)}><Fab color='secondary'><EditIcon/></Fab></div>}
            {(dischng)?<div id='changesyesorno' >
              <p style={{fontSize:"18px"}}>Discard Changes?</p>
              <div><button id='discano' type="button" style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px"}} onClick={(event)=>setdc(false)}>No</button><button id='discayes' type="button" style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px"}} onClick={(event)=>{setdc(false);setce(false);setUD(ADOUser)}}>Yes</button></div>
            </div>:null}
            {(savechng)?<div id='changesyesorno'>
              <p style={{fontSize:"18px"}}>Save Changes?</p>
              <div><button id='discayes' type="button" style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px"}} onClick={(event)=>setsc(false)}>No</button><button id='discano' type='submit' style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px"}}>Yes</button></div>
            </div>:null}
            {(unfri)?<div id='changesyesorno'>
              <p style={{fontSize:"18px",marginLeft:"40px",color:"orangered"}}>UnFriend?</p>
              <div><button type="button" id='discano' style={{outline:"none",border:"outline",width:"70px",height:"25px",fontSize:"15px"}} onClick={(event)=>setuf(false)}>Cancel</button><button id='discayes' type="button" style={{marginLeft:"20px",outline:"none",border:"outline",width:"70px",height:"25px",fontSize:"15px"}} onClick={(event)=>{setuf(false);}}>Confirm</button></div>
            </div>:null}
            </div>
            {(cedit)?null:<div style={{width:"260px",height:showfri?"360px":"50px",borderRadius:showfri?"0px 0px 20px 20px":null,marginTop:"10px",backgroundColor:"rgb(35,35,35)",boxShadow:"0px 0px 5px 1px black"}}><div style={{fontSize:"20px",minwidth:"100px",maxWidth:"200px",margin:"auto",textAlign:"center",marginTop:"10px",cursor:"pointer"}} onClick={(event)=>setsf(true)}>Friends({UserDatas.FriendList?UserDatas.FriendList.length:0})</div>
            {(showfri)?<div style={{height:"300px",marginTop:"20px",overflow:"auto"}}>
              {Friends?.map((fri)=>(
                <div style={{height:"60px",display:"flex",justifyContent:"space-around"}} key={fri.id}>
                  <div style={{width:"50px",height:"50px",borderRadius:"100%"}}><AccountCircleIcon style={{width:"50px",height:"50px"}}/></div>
                  <div style={{width:"170px",height:"40px",color:"snow",paddingLeft:"5px",paddingTop:"10px",display:"flex",justifyContent:"space-between"}}>{fri.Name}<button style={{width:"60px",height:"20px",fontSize:"10px"}} onClick={(event)=>setuf(true)}>UnFriend</button></div>
                </div>
              ))}
            </div>:null}
            </div>}
          </div>
          <div id='profilegenresholderdivonpp'>
            <div id='profilefavgenheading' style={{textAlign:"center",width:"150px",height:"30px",fontSize:"20px"}}>Favourite Genres</div>
            {(!cedit)?<><div id='profilefavgenvaluesholderdiv'>
              {Object.keys(Genres)?.map((gen,index)=>{
                return Genres[index]!=="all"&&UserDatas?.intrestedGenres[Genres[index]]?
                <button id='discano' className='genrebuttons' type="button" key={index} >{Genres[index].charAt(0).toUpperCase()+Genres[index].slice(1)}</button>:null
              })}
            </div></>:
            <div id='profilefavgenvaluesholderdiv'>
              {Object.keys(Genres)?.map((gen,index)=>{
                return Genres[index]!=="all"?
                  <button type="button" className='genrebuttons' id={UserDatas?.intrestedGenres[Genres[index]]?"discano":"discayes"} key={index} onClick={(event)=>{setUD((predt)=>({...predt,intrestedGenres:{...predt.intrestedGenres,[Genres[index]]:!predt.intrestedGenres[Genres[index]]}}))}} >{Genres[index].charAt(0).toUpperCase()+Genres[index].slice(1)}</button>:null
              })}
            </div>}
            <div style={{opacity:".5"}}>ID:{UserDatas.id}</div>
          </div></form>
          </>:null}
          {(history)?<>
          <p style={{fontSize:"20px",width:"100px",margin:"auto",textAlign:"center",marginTop:"20px",fontWeight:"bold"}}>Reviews({UserDatas?.reviews?.length?UserDatas.reviews?.length:0})</p>
          <div style={{width:"600px",height:"370px",margin:"auto",marginTop:"30px",paddingBottom:"10px",overflow:"auto"}}>
            {UserDatas?.reviews?.map((rev,ind)=>(<form key={rev.id} onSubmit={(event)=>{event.preventDefault();setsvrev(false);setEdit(pE=>{if(Array.isArray(pE)){return pE.map(()=>false);}else return[]});UpdateUser(UserDatas);UpdateReviewHisandRev(UserDatas);Update(UserDatas);window.location.reload()}}>
              <div style={{width:"570px",height:"150px",margin:"auto",marginTop:"10px",display:"flex",backgroundColor:"rgb(31,31,31)",boxShadow:"0px 0px 4px 1px black"}}>
                <div>
                  <div style={{width:"520px",height:"50px",display:"flex",justifyContent:"space-between"}}>
                  <p style={{height:"25px",fontSize:"19px",marginLeft:"20px",color:"cornsilk"}}>{BoNa[ind]}</p>
                  <div style={{width:"120px",marginRight:"20px",marginTop:"20px"}} title={rev.rating}><Rating name="simple-controlled" precision={0.1} readOnly={!Edit[ind]} onChange={(event)=>{const NRH=[...UserDatas.reviews];NRH[ind].rating=event.target.value;setUD({...UserDatas,reviews:NRH});}} value={rev.rating}/></div>
                  </div>
                  <div style={{width:"450px",height:"90px",paddingLeft:"70px",overflow:"auto",paddingTop:"5px"}}><textarea type='text' style={{width:"380px",resize:"none",height:"80px",border:Edit[ind]?"1px groove":"none",outline:Edit[ind]?"":"none",background:"none",color:"lightskyblue",borderRadius:"10px",paddingLeft:"10px",fontSize:"17px"}} readOnly={!Edit[ind]} required onChange={(event)=>{const NRH=[...UserDatas.reviews];NRH[ind].review=event.target.value;setUD({...UserDatas,reviews:NRH});}} value={rev.review}></textarea></div>
                </div>
                <div style={{width:"50px",height:"150px"}}>
                  <div style={{width:"40px",height:"40px",borderRadius:"100%",margin:"auto",marginTop:"10px"}}><Fab color='secondary' style={{width:"40px",height:"40px"}} onClick={(event)=>{(Edit[ind])?(setddrev(true)):(setEdit({...Edit,[ind]:true}))}}>{(!Edit[ind])?<EditIcon/>:<ClearIcon/>}</Fab></div>
                  <div style={{width:"40px",height:"40px",borderRadius:"100%",margin:'auto',marginTop:"10px"}}><Fab color='secondary' style={{width:"40px",height:"40px"}} onClick={(event)=>{if(Edit[ind]){setddrev(false);setsvrev(true);}else{setdid(rev.id);setdbid(rev.alterId);setdelrev(true)}}}>{(Edit[ind])?<BookmarkAddedIcon/>:<DeleteIcon/>}</Fab></div>
                </div>
              </div>
                {(showddrev)?<div id='changesyesorno'>
                  <p style={{fontSize:"18px"}}>Discard Changes?</p>
                  <div><button id='discano' type="button" style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>setddrev(false)}>No</button><button id='discayes' type="button" style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setddrev(false);setEdit(pE=>{if(Array.isArray(pE)){return pE.map(()=>false);}else return[]});setUD(ADOUser);window.location.reload();}}>Yes</button></div>
                </div>:null}
                {(showsvrev)?<div id='changesyesorno'>
                  <p style={{fontSize:"18px"}}>Save Changes?</p>
                  <div><button id='discayes' type="button" style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>setsvrev(false)}>No</button><button id='discano' type="submit" style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}}>Yes</button></div>
                </div>:null}
                {(showdelrev)?<div id='changesyesorno'>
                  <p style={{fontSize:"18px"}}>Are You Sure?</p>
                  <div><button type="button" id='discayes' style={{outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setdelrev(false);setdbid(0);setdid(0);}}>No</button><button type="button" id='discano' style={{marginLeft:"50px",outline:"none",border:"outline",width:"40px",height:"25px",fontSize:"15px",cursor:"pointer"}} onClick={(event)=>{setdelrev(false);setEdit(pE=>{if(Array.isArray(pE)){return pE.map(()=>false);}else return[]});DelRev();}}>Yes</button></div>
                </div>:null}
                </form>
            ))}
          </div>
          </>:null}
        </div>
    </div>
  )
}
