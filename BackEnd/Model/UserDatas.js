import mongoose from "mongoose";
import { NotiFications } from "./Notification.js";
import { Review } from "./Review.js";

const UserDatas = new mongoose.Schema({

    _id:{
        type:Number,
        required : true
    },
    id:{
        type:Number,
        required : true
    },
    uname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required : true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required : true
    },
    bio:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    },
    profilePic:{
        type:{
            url:String
        }
    },
    notification:[
        NotiFications
    ],
    intrestedGenres: {
        philosophy: Boolean,
        action: Boolean,
        fiction: Boolean,
        romance: Boolean,
        history: Boolean,
        nonFiction: Boolean,
        selfHelpBook: Boolean,
        biography: Boolean,
        horror: Boolean,
        politics: Boolean,
        comics: Boolean,
        fantasy: Boolean
    },
    reviews:[Review]

})

export const UserData = mongoose.model("UserData",UserDatas);