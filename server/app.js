import express from "express";
import dotenv from "dotenv";
import todoRouter from "./controllers/index.js"
import "./utils/dbConnect.js"
import cors from "cors"
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())

let corsObject = {
    origin:["http://localhost:5173"],
    methods:["GET","POST","DELETE","PUT"]
}

app.use(cors(corsObject))

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"Welcome"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

app.use("/todo",todoRouter)

app.listen(port,()=>console.log(`Server is running at http://localhost:${port}`))