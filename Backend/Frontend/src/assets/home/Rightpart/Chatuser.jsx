import React from 'react'
import useConversation from '../../../../zustand/useConversation';
import { useSocketContext } from '../../../context/SocketContext';

function Chatuser() {
  const {selectedConversation}=useConversation();
  const {onlineUsers}=useSocketContext();
  const isOnline=onlineUsers.includes(selectedConversation?._id);
  return (
    <div className='flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700   duration-300 h-[8vh]'><div className={`avatar ${isOnline?"avatar-online":""}`}>
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
  </div>
</div><div><h1 className='text-xl'>{selectedConversation.fullname}</h1>
      <span className='text-sm'>{isOnline?"Online":"Offline"}</span>
      </div>
      
      </div>
  )
}

export default Chatuser;