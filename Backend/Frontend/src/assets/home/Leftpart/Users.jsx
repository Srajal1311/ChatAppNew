import React from "react";
import useConversation from "../../../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function Users({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(user._id);
  const isSelected =
    selectedConversation ? selectedConversation._id === user._id : false;

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer transition-colors ${
        isSelected ? "bg-slate-700" : "hover:bg-slate-600"
      }`}
    >
      <div className="flex items-center space-x-4 px-6 py-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
            alt="user avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
          {/* Online dot (Tailwind only, no DaisyUI needed) */}
          <span
            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-slate-900 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
            title={isOnline ? "Online" : "Offline"}
          />
        </div>

        {/* Text */}
        <div className="text-white">
          <h1 className="font-bold">{user?.fullname || "No Name"}</h1>
          <span className="text-sm opacity-70">{user?.email || "No Email"}</span>
        </div>
      </div>
    </div>
  );
}

export default Users;

