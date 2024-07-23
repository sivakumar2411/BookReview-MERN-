import mongoose from "mongoose";
import { Review } from "./Review.js";

const BookDatas = new mongoose.Schema({

    _id:{
        type:Number,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    r_Rated:{
        type:Boolean,
        required:true,
        default:false
    },
    genre: {
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
        fantasy: Boolean,
        all:Boolean
    },
    reviews:[Review],
    bookCover:{
        url:{
            type:String,
            required:true,
            default:" "
        }
    }

})


export const BookData = mongoose.model("BookData",BookDatas);