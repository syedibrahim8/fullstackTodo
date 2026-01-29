import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB;

async function dbConnect(){
    try {
        await mongoose.connect(DB_URI)
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }
}

dbConnect();