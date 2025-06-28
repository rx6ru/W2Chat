import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({

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

    //todo: Optimise this

    setSelectedUser: (selectedUser)=>{
        set({ selectedUser });
    }

}));