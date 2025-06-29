import mongoose from "mongoose";

const inviteCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const InviteCode = mongoose.model("InviteCode", inviteCodeSchema);




export default InviteCode;