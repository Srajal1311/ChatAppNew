import React from "react";
import useConversation from "../../../../zustand/useConversation";
import { useSocketContext } from "../../../context/SocketContext";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-[8vh] bg-gray-800 text-gray-300">
        Select a chat
      </div>
    );
  }

  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="flex items-center space-x-3 justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh] text-gray-200">
      <div className="relative">
        <img
          src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
          alt={selectedConversation.fullname || "user"}
          className="w-12 h-12 rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-gray-800" />
        )}
      </div>

      <div>
        <h1 className="text-xl leading-tight">
          {selectedConversation.fullname || "User"}
        </h1>
        <span className="text-sm text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
