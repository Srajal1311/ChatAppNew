import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import messageRoute from "./routes/message.route.js";
import { app } from './SocketIO/server.js';
import { server } from './SocketIO/server.js';
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();




//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (process.env.CLIENT_URLS || "http://localhost:5173"),
  credentials: true
}));
const PORT = process.env.PORT || 4000;
const URI=process.env.MONGODB_URI;

try{
  mongoose.connect(URI)
  console.log("Connected to MongoDB")
  
} catch(error){
  console.log(error);
}
//routes
app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

// -----------code for deployment------------
if(process.env.NODE_ENV === "production"){
    const dirPath=path.resolve();
    app.use(express.static("./Frontend/dist"));
    app.get(/^(?!\/api).*/,(req,res)=>{
      res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
    })
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})