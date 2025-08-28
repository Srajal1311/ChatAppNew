import mongoose from 'mongoose';
import User from "../models/user.model.js"
import { sendMessage } from '../controller/message.controller.js';
const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps:true});

const Message= mongoose.model("message",messageSchema);

export default Message;