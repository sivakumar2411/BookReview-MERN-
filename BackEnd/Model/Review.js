import mongoose from "mongoose";

export const Review = new mongoose.Schema({
    id:{
        type:Number,
        // require:true
    },
    review:{
        type:String,
        // required:true
    },
    rating:{
        type:Number,
        // required:true
    },
    alterId:{
        type:Number,
        // required:true
    }
})