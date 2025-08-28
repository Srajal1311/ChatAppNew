import React from 'react'
import { LuSend } from "react-icons/lu";
import useSendMessage from '../../../context/useSendMessage.js';
import axios from 'axios';
function Typesend() {
  const [message,setMessage]=React.useState("")

  const {loading,sendMessages}= useSendMessage();
  const handleSubmit= async (e)=>{
    console.log(e)
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex text-center space-x-0 h-[8vh] bg-gray-800'><div className='w-[70%] mx-4 '><input  type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type here" className="border border-gray-700 cursor-pointer hover:bg-slate-800 duration-300 bg-slate-900 outline-none w-full px-4 py-2 mt-1 rounded-lg" />
    
    </div>
    <button>
        <LuSend className='text-2xl cursor-pointer  '/>
        </button></div>
    </form>
  )
}

export default Typesend