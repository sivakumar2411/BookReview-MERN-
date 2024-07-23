import mongoose from "mongoose";

export const NotiFications = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        required:true,
        default:false
    }
})
