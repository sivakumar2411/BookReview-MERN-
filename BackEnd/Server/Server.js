import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { ConnectToDB } from "../Database/DataBaseConnection.js";
import Routes from "../Routes/Routes.js"


const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json())
app.use(Routes);

app.listen( PORT ,() =>{
    {
        ConnectToDB();
        console.log(`Server Running On Port ${PORT}`);
    }
})