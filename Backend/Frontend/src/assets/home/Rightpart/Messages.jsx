import React, { useEffect, useMemo, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../../components/Loading.jsx";
import useConversation from "../../../../zustand/useConversation.js";
import useGetSocketMessage from "../../../context/useGetSocketMessage.js";

function Messages() {
  // your existing data sources
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // keep your existing live updates

  const { selectedConversation } = useConversation();

  const lastMsgRef = useRef();

  // current user id from localStorage (your existing pattern)
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const myId = authUser?.user?._id;
  const partnerId = selectedConversation?._id;

  // ✅ Filter ONLY the messages between me and the selected user
  const convMsgs = useMemo(() => {
    if (!Array.isArray(messages) || !myId || !partnerId) return [];

    // If your backend includes conversationId, this is even simpler:
    // return messages.filter(m => m.conversationId === partnerId);

    return messages.filter(
      (m) =>
        (m.senderId === myId && m.receiverId === partnerId) ||
        (m.senderId === partnerId && m.receiverId === myId)
    );
  }, [messages, myId, partnerId]);

  // auto-scroll to last message when this conversation’s messages change
  useEffect(() => {
    const id = setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
    return () => clearTimeout(id);
  }, [convMsgs]);

  return (
    <div
      className="flex-1 overflow-y-auto hide-scrollbar"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : convMsgs.length > 0 ? (
        convMsgs.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div key="empty message">
          <p className="text-center mt-[20%]">
            Say <b>Hey!</b> <br /> & <br /> start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
