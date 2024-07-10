import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import path, { dirname } from "path"
import { ConnectToDB } from "../Database/DataBaseConnection.js";
import Routes from "../Routes/Routes.js"


const app = express();
const _dirname = path.resolve()

dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(_dirname,"FrontEnd/build")))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(Routes);



// app.use(cors({origin:"http://localhost:3000"}));
app.use(cors({origin: 'https://bookreview-mern.onrender.com'}));

app.get("*",(req,res)=>{

    res.sendFile(path.join(_dirname,"FrontEnd","build","index.html"));

})

app.listen( PORT ,() =>{
    {
        ConnectToDB();
        console.log(`Server Running On Port ${PORT}`);
    }
})