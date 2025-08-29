import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser?.user?._id;

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`px-4 py-2 flex ${itsMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%]`}>
        <div
          className={[
            "inline-block rounded-2xl px-4 py-2 text-white break-words",
            itsMe ? "bg-blue-500" : "bg-slate-500",
            // optional subtle "sending" animation feel
            "transition-transform duration-150",
          ].join(" ")}
        >
          {message.message}
        </div>
        <div
          className={[
            "mt-1 text-xs text-gray-400",
            itsMe ? "text-right" : "text-left",
          ].join(" ")}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;