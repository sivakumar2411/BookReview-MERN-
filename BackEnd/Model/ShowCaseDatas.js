import mongoose from "mongoose";

const ShowcaseDatas = new mongoose.Schema({

    _id:{
        type:Number
    },
    id:{
        type:Number
    },
    Bid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BookDatas"
    }

})

export const ShowCase = mongoose.model("Showcase",ShowcaseDatas);