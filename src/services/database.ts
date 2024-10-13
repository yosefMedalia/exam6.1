//חיבור לדאטא בייס

import mongoose from "mongoose";
import dotenv from "dotenv";

//מפעיל את הספריה
dotenv.config();
//פונקציית חיבור לדאטא בייס
export const connectToDatabase = async(): Promise<void> =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to mpongoose database");
        
    } catch (error) {
        console.log("Couldn't connect to database");
        
    }
}