import { create } from 'zustand'
import axios from 'axios';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  messages:[],
  setMessage: (messages)=>set({messages}),
}));
export default useConversation;
