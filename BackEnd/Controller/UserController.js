import express from "express";
import {UserData} from "../Model/UserDatas.js";


export const PostNewUser = async(req,res) =>{
    try{
        const {id,name,uname,email,password,gender,region,bio,admin,profilePic,notifications,intrestedGenres,reviews} = req.body;

        const data = new UserData({
            id,name,uname,email,password,gender,region,bio,admin,profilePic,notifications,intrestedGenres,reviews,
            _id : id
        })

        await data.save();
        res.status(201).json({message:"Datas Posted SuccessFully"});
        
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at PostNewUser",error.message);
    }
}

export const GetAllUser = async(req,res) =>{
    try{
        const data = await UserData.find();
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at GetAllUser",error.message);
    }
}

export const GetUserById = async(req,res) =>{
    try{
        const data = await UserData.findById(req.params.id);
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at GetUser By Id",error.message);
    }
}

export const UpdateUserById = async(req,res) =>{
    try{
        const User = new UserData(req.body);
        await UserData.findByIdAndUpdate(req.params.id,User);
        res.status(200).json({message:"Datas Updated SuccessFully!"});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Update UserDatas",error.message);
    }
}

export const UpdateReview = async(req,res) =>{
    try{
        const {id} = req.params;
        const {urev} = req.body;
        const User = await UserData.findById(id);
        if(!User){
            return res.status(404).json({error:"User Not Found"});
        }
        const index = User.reviews.findIndex(review => review.id === urev.id);
        if(!index)
        {
            return res.status(404).json({error:"Review Not Found"});
        }
        User.reviews[index]=urev;
        await User.save();
        return res.status(200).json({message:"Review Updated SuccessFully!"});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Update Review in UserDatas",error.message);
    }
}


export const NewMSG = async(req,res) =>{
    try{
        const {id} = req.params;
        const {msg} = req.body;
        const User = await UserData.findById(id);
        if(!User){
            return res.status(404).json({error:"User Not Found"});
        }
        const nid = User.notifications.length > 0 ? (User.notifications.reduce((max,noti)=>{return noti.id > max ? noti.id : max}) + 1) : 1;
        const nmsg = {
            ...msg,
            id:nid
        }
        User.notifications.push(nmsg);
        await User.save();
        return res.status(200).json({message:"New Msg Inserted SuccessFully!"});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Insert New Msg in UserDatas",error.message);
    }
}

export const MSGToAll = async(req,res) =>{
    try{
        const {msg} = req.body;
        const Users = await UserData.find();
        for(const User of Users)
        {
            const nid = User.notifications.reduce((max,noti)=>{return noti.id > max ? noti.id : max}) + 1;
            const nmsg = {
                ...msg,
                id:nid
            }
            User.notifications.push(nmsg);
            await User.save();
        }
        return res.status(200).json({message:"Msgs Inserted SuccessFully!"});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("Error at Insert Msgs in UserDatas",error.message);
    }
}


// export const UpdateAllUsersAdmin = async(req,res) =>{
//     try{
//         const {datas} = req.body;
//         for(const user of datas)
//             await UserData.findByIdAndUpdate(user.id,{admin:user.admin});
//         res.status(200).json({ message: "Admin status updated successfully" });
//     }
//     catch(error){
//         res.status(500).json({error:"Internal Server Error"});
//         console.log("Error at Update Admin in UserDatas",error.message);
//     }
// }
