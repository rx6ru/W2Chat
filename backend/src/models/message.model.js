import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
)

const Message= mongoose.model("Message", messageSchema);

export default Message 