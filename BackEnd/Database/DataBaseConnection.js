import mongoose from "mongoose"

export const ConnectToDB = async() => {
    try{
        await mongoose.connect(process.env.DataBase_URI,{
            dbName:"BookReview"
        });
        console.log("SuccessFully Connected With the DataBase");
    }
    catch(error)
    {
        console.log("Error At Connect To The DataBase",error.message);
    }
}