import mongoose from "mongoose";

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
        comic: Boolean,
        fantasy: Boolean,
        all:Boolean
    },
    reviews:{
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
    },
    bookCover:{
        url:{
            type:String,
            required:true,
            default:" "
        }
    }

})


export const BookData = mongoose.model("BookData",BookDatas);