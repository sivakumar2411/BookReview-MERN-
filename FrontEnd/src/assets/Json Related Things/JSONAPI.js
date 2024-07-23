import axios from 'axios';

// const Api_URL ='http://localhost:3410';

// const BE_Api_URL ='http://localhost:1430';
const BE_Api_URL ='';

// export const getAllDatas=()=> axios.get(`${Api_URL}/BookData`);
export const getAllDatas=()=> axios.get(`${BE_Api_URL}/BookDatas/GetAll`);

export const getRecBooks=async(Genre)=>await axios.post(`${BE_Api_URL}/BookDatas/GetRecommdBooks`,Genre);

// export const getBookDatasbyid=(id)=> axios.get(`${Api_URL}/BookData/${id}`);
export const getBookDatasbyid=(id)=> axios.get(`${BE_Api_URL}/BookDatas/GetById/${id}`);

// export const getAllUserDatasFP=()=> axios.get(`${Api_URL}/UserDatas`);
export const getAllUserDatasFP=()=> axios.get(`${BE_Api_URL}/UserDatas/GetAll`);
// export const CheckEmailExist=async(a)=> await axios.get(`${BE_Api_URL}/UserDatas/Email/${a}`);
// export const CheckUNameExist=async(a)=> await axios.get(`${BE_Api_URL}/UserDatas/Name/${a}`);

// export const getUserDatasbyid=(id)=> axios.get(`${Api_URL}/UserDatas/${id}`);

// export const getReviewerName=(id)=> axios.get(`${Api_URL}/UserDatas/${id}`);
export const getUserById=(id)=> axios.get(`${BE_Api_URL}/UserDatas/GetById/${id}`);

// export const getFriendName=(id)=> axios.get(`${Api_URL}/UserDatas/${id}`);

// export const getAllgenres=()=> axios.get(`${Api_URL}/Genres`);
// export const getAllgenres=()=> axios.get(`${BE_Api_URL}/Genres/GetAllData`);

// export const getAllUserDatas=()=> axios.get(`${Api_URL}/LogInData`);
// export const getAllUserDatas=()=> axios.get(`${BE_Api_URL}/LogInData/GetAllData`);


// export const getUserById = (id) => axios.get(`${Api_URL}/LogInData/${id}`);
// export const getUserById=(id)=> axios.get(`${BE_Api_URL}/LogInData/GetByID/${id}`);

// export const getCurUser = () => axios.get(`${Api_URL}/CurrentUser/${1}`);

// export const GetShowCaseDatas = () => axios.get(`${Api_URL}/ShowcaseDatas`);
export const GetShowCaseDatas = () => axios.get(`${BE_Api_URL}/BookShowCase/GetAll`);

// export const addNewUser = async (data) => {
//     try {
//         const { data: existingData } = await getAllUserDatas;
//         const newId =Math.max(...existingData.map(user => user.id),0);
//     const newData = {
//         ...data,
//         id: newId+1
//     };
//     await axios.post(`${Api_URL}/LogInData`, newData);
//     const AllDatas={
//         id:newId+1,
//         uname: newData.name,
//       Name: newData.name,
//       Gender:"",
//       Region:"",
//       Bio:"",
//       admin:false,
//       ReviewHistory:[],
//       FriendList:[],
//       newnotis:1,
//       ProfilePic:{file:null,url:null},
//       Notification:[{id:1,msg:"Welcome to our Application",seen:false}],
//       IntrestedGenres: {
//         Philosophy: false,
//         Action: true,
//         Fiction: true,
//         Romance: false,
//         History: false,
//         "Non-Fiction": false,
//         SelfHelpBook: false,
//         Biography: false,
//         Horror: false,
//         Politics: false,
//         Comics: false,
//         Fantasy: false
//         },
//     }
//     await axios.post(`${Api_URL}/UserDatas`,AllDatas);
//     alert("SignUp Successfully");
//  } catch (error) {
//         console.error('Error adding new user:', error);
//     }
// };
export const addNewUser = async (data) => {
    try {
        const { data: existingData } = await getAllUserDatasFP();
        const newId =Math.max(...existingData?.map(user => user.id),0);
    const AllDatas={
        ...data,
        id:newId + 1,
        uname: data.name,
      gender:" ",
      region:" ",
      bio:" ",
      admin:false,
      reviews:[],
      profilePic:{url:""},
      notification:[{id:1,msg:"Welcome to our Application",seen:false}],
      intrestedGenres: {
        philosophy: false,
        action: true,
        fiction: true,
        romance: false,
        history: false,
        nonFiction: false,
        selfHelpBook: false,
        biography: false,
        horror: false,
        politics: false,
        comics: false,
        fantasy: false
        },
    }
    await axios.post(`${BE_Api_URL}/UserDatas/InsertNew`,AllDatas);
    alert("SignUp Successfully");
 } catch (error) {
        console.error('Error adding new user:', error);
    }
};

export const addBookReview = async (bookid,newReview) => {
    try {
        const { data: existingData } = await getBookDatasbyid(bookid);
        const newReviewId =existingData.reviews?existingData.reviews.length + 1:1;
        const Review = {
            ...newReview,
            id: newReviewId
        };
        if(Review.id === 1)
            existingData.reviews = Array(Review)
        else
        existingData.reviews.push(Review);
        await axios.put(`${BE_Api_URL}/BookDatas/UpdateById/${bookid}`,existingData);
    }
    catch (error) {
        console.error('Error in adding new review:', error);
    }
};

export const AddreviewHistory=async (revhis,reviewerid)=>{
    try{
    const {data:existingData}=await getUserById(reviewerid);
    const newid=existingData.reviews?Math.max(...existingData.reviews?.map(({id})=>id)):0;
    const Nrevhis={
        ...revhis,
        id:newid+1
    }
    if(Nrevhis.id === 1)
        existingData.reviews = Array(Nrevhis)
    else
    existingData.reviews?.push(Nrevhis);
    await axios.put(`${BE_Api_URL}/UserDatas/UpdateById/${reviewerid}`,existingData)}
    catch(er){console.log("Error in AddRevHis",er);}
}

export const AddNewBook=async(NBookData)=>{
    try{
    const {data:existingdata}=await getAllDatas();
    const newid=(existingdata.length > 0)?Math.max(...existingdata?.map(({id})=>id),0):0;
    const newbook={
        ...NBookData,
        id:newid+1,
        reviews:[]
    }
    // await axios.post(`${Api_URL}/BookData`,newbook);
    await axios.post(`${BE_Api_URL}/BookDatas/InsertNew`,newbook);}
    catch(er){console.log("Error in AddNewBook",er);}
}

export const updatebookDT=async(Book)=> axios.put(`${BE_Api_URL}/BookDatas/UpdateById/${Book.id}`,Book)

// export const updateGenres=async(Book)=>{
//     try{
//     const {data:gendata}=await getAllgenres;
//     gendata.map(
//         async(gen)=>{
//             if(Book.genre[gen.genname])
//             {
//                 if(!gen.bookids.includes(Book.id))
//                 gen.bookids.push(Book.id);
//             }
//             else
//             {
//                 if(gen.bookids.includes(Book.id))
//                 gen.bookids=gen.bookids.filter((id)=>id!==Book.id);
//             }
//             await axios.put(`${Api_URL}/Genres/${gen.id}`,gen);
//             // await axios.put(`${BE_Api_URL}/Genres/UpdateGenre/${gen.id}`,gen);
//         }
//     )}
//     catch(er){console.log("Error in GenreUpdate",er);}
// }

// export const updatecurUser =(data)=>axios.put(`${Api_URL}/CurrentUser/${1}`,data);


export const DeleteBook=async(id)=>{
    await axios.delete(`${BE_Api_URL}/BookDatas/DeleteById/${id}`);
    RemoveFromShowCase(id);
}

export const DeleteReviews=async(bid,delrev)=>{
    try{
    // const {data:bookrev}=await axios.get(`${Api_URL}/BookData/${bid}`);
    // const {data:userrev}=await axios.get(`${Api_URL}/UserDatas/${delrev.uid}`);
    // if(delrev.rid!==0)
    // {const newbrev=bookrev.reviews.filter(
    //     (review)=>review.id!==delrev.rid
    //     );
    //     const udbook={
    //         ...bookrev,
    //         reviews:newbrev
    //     }
    //     await axios.put(`${Api_URL}/BookData/${bid}`,udbook);}
    // const newurevh=userrev.ReviewHistory.filter(
    //     (review)=>review.Bid!==bid
    // );
    // const udurev={
    //     ...userrev,
    //     ReviewHistory:newurevh
    // }
    // const MSG="We Remove your Review from the Book "+bookrev.name;
    // MSGTOID(MSG,delrev.uid);
    // await axios.put(`${Api_URL}/UserDatas/${delrev.uid}`,udurev);
    console.log(bid,delrev);
    await axios.delete(`${BE_Api_URL}/BookDatas/UpdateById/${bid}/RemoveReview/${delrev}`)
    await axios.delete(`${BE_Api_URL}/UserDatas/DeleteReviewById/${delrev}/${bid}`);
    const MSG="We Remove your Review from the Book";
    MSGTOID(MSG,delrev.uid);

}
    catch(er){console.log("Error in Review Delete",er);}
}

export const UpdateUser=async(UserDt)=> {
    const {data:udata} = await getAllUserDatasFP();
    for(const user of udata)
        if(user.id !== UserDt.id && user.uname === UserDt.uname)
        {
            alert("UserName Already Exist");
            return;
        }
    await axios.put(`${BE_Api_URL}/UserDatas/UpdateById/${UserDt.id}`,UserDt);
}
    // try{
    // const{data:OD}=await getUserDatasbyid(UserDt.id);
    // if(OD.uname!==UserDt.uname)
    // {
    //     const{data:LD}=await getUserById(OD.id);
    //     const{data:ALD}=await getAllUserDatas();
    //     const AE=ALD.findIndex(({name})=>(name===UserDt.uname));
    //     if(AE!==-1)
    //     alert("UserName Already Exist");
    //     else
    //     {
    //         const ND={
    //             ...LD,
    //             name:UserDt.uname
    //         }
    //         await axios.put(`${Api_URL}/LogInData/${ND.id}`,ND);
    //         // await axios.put(`${BE_Api_URL}/LogInData/UpdateData/${ND.id}`,ND);
    //         await axios.put(`${Api_URL}/UserDatas/${UserDt.id}`,UserDt);
    //     }
    // }
    // else
    // await axios.put(`${Api_URL}/UserDatas/${UserDt.id}`,UserDt);}
    // catch(er){console.log("Error in User Update",er);}

export const UpdateBookDatas=async(id,data)=>
{
    await axios.put(`${BE_Api_URL}/BookDatas/UpdateById/${id}`,data);
    alert("Updated Successfully");
}

export const UpdateReviewHisandRev=async(UD)=>{
    try{
    UD.reviews?.map(async(riv)=>{
        const{data:BD}=await getBookDatasbyid(riv.alterId);
        const NBDR=BD.reviews?.map(async(rriv)=>{
            if(rriv.alterId===UD.id)
            {
                const nBR={
                    ...rriv,
                    review:riv.review,
                    rating:riv.rating
                }
                return nBR;
            }
            else
            return rriv;
        })
        const promises=await Promise.all(NBDR);
        const NBD = {
            ...BD,
            reviews:promises
        }
        await axios.put(`${BE_Api_URL}/BookDatas/UpdateById/${NBD.id}`,NBD);
    })}
    catch(er){console.log("Error in Update Review",er);}
}

export const DeleteRevFromBook=async(Bid,Uid)=>{
    const{data:Book} = await getBookDatasbyid(Bid);
    const NR = Book.reviews.filter(rev=>rev.alterId !== Uid);
    await UpdateBookDatas(Bid,{...Book,reviews:NR});
}

export const UpdateBookRevandUserRH=async(Brev,urev)=>{
    try{
    // const {data:UD}=await getUserById(Brev.revid);
    // const Nrev=UD.ReviewHistory.map((revi)=>{
    //     if(revi.Bid===urev.Bid)
    //     {
    //         const NNrev={
    //             ...revi,
    //             rev:urev.rev,
    //             rating:urev.rating
    //         }
    //         return NNrev;
    //     }
    //     else
    //     return revi;
    // })
    // const NUD={
    //     ...UD,ReviewHistory:Nrev
    // }
    // await axios.put(`${Api_URL}/UserDatas/${Brev.revid}`,NUD);
    // const{data:BD}=await getBookDatasbyid(urev.Bid);
    // const NBrev=BD.reviews.map((revi)=>{
    //     if(revi.revid===Brev.revid)
    //     {
    //         const NNrev={
    //             ...revi,
    //             rev:urev.rev,
    //             rating:urev.rating
    //         }
    //         return NNrev;
    //     }
    //     else
    //     return revi;
    // })
    // const NBD={
    //     ...BD,reviews:NBrev
    // }
    // await axios.put(`${Api_URL}/BookData/${urev.Bid}`,NBD);
    console.log(urev,Brev);
    // await axios.put(`${BE_Api_URL}/UserDatas/UpdateById/Review/${Brev.alterId}`,urev);
    // await axios.put(`${BE_Api_URL}/BookDatas/UpdateById/Review/${urev.alterId}`,Brev);

    const {data:Book} = await getBookDatasbyid(urev.alterId);
    const {data:User} = await getUserById(Brev.alterId);

    console.log(Book,User);
    const NBR = Book.reviews.map(rev=>
        rev.alterId === Brev.alterId ? {...rev, review:urev.review, rating:Brev.rating}:rev
    )

    const NUR = User.reviews.map(rev=>
        rev.alterId === urev.alterId ? {...rev, review:urev.review, rating:urev.rating}:rev
    )

    const NBook = {...Book, reviews: NBR}
    const NUser = {...User, reviews: NUR}

    UpdateUser(NUser);
    UpdateBookDatas(NBook.id,NBook);

}
    catch(error){console.log("Error in Updating",error);}
}

export const MSGTOALL=async(msg)=>{
    try
    {
        // const{data:Users}=await getAllUserDatasFP();
        // Users.map(async(user)=>{
        //     if(user.id!==143)
        //     {const maxnotiid=Math.max(user.Notification?.map(noti=>noti.id)|| 0)+1;
        //     const ON=[...user.Notification]
        //     const NN={
        //         id:maxnotiid,msg:msg,seen:false
        //     }
        //     ON.push(NN);
        //     const Nuser={...user,newnotis:user.newnotis+1,Notification:ON}
        //     await axios.put(`${Api_URL}/UserDatas/${user.id}`,Nuser)}
        // })
        await axios.put(`${BE_Api_URL}/UserDatas/MsgToAll`,msg);
    }
    catch(e){console.log("Error in MSGTOALL",e)}
}

export const MSGTOID=async(msg,id)=>{
    try{
    // const {data:User}=await getUserById(id);
    // const newnum=Math.max(...(User?.Notification?.map(noti => noti.id) || 0))+1;
    // const ON=[...User.Notification]
    // const NN={
    //     id:newnum,
    //     msg:msg,
    //     seen:false
    // }
    // ON.push(NN);
    // const NUser={
    //     ...User,
    //     newnotis:User.newnotis+1,
    //     Notification:ON
    // }
    // await axios.put(`${Api_URL}/UserDatas/${id}`,NUser);
    await axios.put(`${BE_Api_URL}/UserDatas/MsgById/${id}`,msg);
}
    catch(error){console.log("Error in NotiFication",error);}
}

export const AdminChange=async(users)=>{
    const Nusers={
        ...users,admin:!users.admin
    }
    await axios.put(`${BE_Api_URL}/UserDatas/UpdateById/${users.id}`,Nusers)
}

export const AddForShowCase = async(id) => await axios.post(`${BE_Api_URL}/BookShowCase/InsertNew/${id}`)

export const RemoveFromShowCase = async(id)=> await axios.delete(`${BE_Api_URL}/BookShowCase/Remove/${id}`)

/*export const SENDGMAIL=async(UD)=>{
    try{
    const {data:ULD}=await getUserById(UD.id);
    const NULD={
        ...ULD,
        password:ULD.email.slice(0,4)+'143'
    }
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '727722eucs169@skcet.ac.in',
            pass: 'Doraemon4'
        }
    });
  const mailOptions = {
    from:'SuxuS<727722eucs169@skcet.ac.in>',
    to:ULD.email,
    subject:'Password Change',
    text:'We Changed your password for your request, your New Password is your Email id\'s First 4 letters then 143.For Example, Email:ashketchum@gmail.com; Password:ashk143'
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
console.log(NULD);
await axios.put(`${Api_URL}/LogInData/${NULD.id}`,NULD);
}
catch(e){console.log("Error In SendMail"+e);}
}*/