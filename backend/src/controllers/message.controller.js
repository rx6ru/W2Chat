import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
} 

export const getMessages = async (req, res) => {
    try {
        const receiverId=req.params.id;
        const loggedInUserId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:loggedInUserId,receiverId:receiverId},
                {senderId:receiverId,receiverId:loggedInUserId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
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

        //todo->implement realtime functionality with socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({message:"Internal Server Error"});        
    }
     
}