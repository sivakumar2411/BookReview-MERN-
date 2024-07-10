import mongoose from "mongoose";

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
        {
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
        }
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
        comic: Boolean,
        fantasy: Boolean
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
    }

})

export const UserData = mongoose.model("UserData",UserDatas);