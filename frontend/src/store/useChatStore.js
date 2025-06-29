import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({

    messages: [],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,


    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            console.log("Error in getUsers", error);
            toast.error("Error in getting users"); 
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in getMessages", error);
            toast.error("Error in getting messages"); 
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log("Error in sendMessage", error);
            toast.error("Error in sending message");
        }
    },


    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=>{
            if(newMessage.senderId!==selectedUser._id) return;
            set({ messages: [...get().messages, newMessage] });
        })
    },

    unsubscribeFromMessages: () => {
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser)=>{
        set({ selectedUser });
    }



}));