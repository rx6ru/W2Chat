import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io} from "../lib/socket.js";
import asyncHandler from "../lib/utils/asyncHandler.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
    const loggedInUserId=req.user._id;
    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    res.status(200).json(filteredUsers);
});

export const getMessages = asyncHandler(async (req, res) => {
    const receiverId=req.params.id;
    const loggedInUserId=req.user._id;
    const messages=await Message.find({
        $or:[
            {senderId:loggedInUserId,receiverId:receiverId},
            {senderId:receiverId,receiverId:loggedInUserId}
        ]
    });

    res.status(200).json(messages);
});

export const sendMessage = asyncHandler(async (req, res) => {
    const {text,image}=req.body;
    const senderId=req.user._id;
    const receiverId=req.params.id;

    let imageUrl;

    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image);
        imageUrl=uploadResponse.secure_url;
    }

    const newMessage=await Message.create({
        senderId,
        receiverId,
        text,
        image:imageUrl
    });

    await newMessage.save();

    const receiverSocketId=await getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(newMessage);
});