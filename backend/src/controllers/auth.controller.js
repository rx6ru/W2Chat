import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import InviteCode from "../models/inviteCode.model.js";
import { userSchema, loginSchema } from "../lib/utils/types.js";
import { generateToken } from "../lib/utils/tokenGen.js";
import cloudinary from "../lib/cloudinary.js";
import validator from "validator";

//todo: Protect against SQL injection

export const signup = asyncHandler(async (req, res) => {
    let { fullName, email, password, inviteCode } = req.body;
    // Sanitize invite code and email
    inviteCode = validator.escape(String(inviteCode || ""));
    email = validator.normalizeEmail(String(email || ""));
    fullName = validator.escape(String(fullName || ""));

    if (!fullName || !email || !password || !inviteCode) {
        return res.status(400).json({
            message: "All fields and invite code are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters",
        });
    }

    //use zod validation
    const result = userSchema.safeParse({ fullName, email, password });
    if (!result.success) {
        return res.status(400).json({
            message: `Error-${result.error.issues[0].message}`,
        });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: "Email already exists",
        });
    }

    // Check invite code in DB
    const codeDoc = await InviteCode.findOne({ code: inviteCode });
    if (!codeDoc) {
        return res.status(400).json({
            message: "Invalid invite code",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
        fullName,
        email,
        password: hashedPassword,
    });

    if (!newUser) {
        return res.status(400).json({
            message: "User not created - Invalid User Data",
        });
    }

    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
    });
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters",
        });
    }

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
        return res.status(400).json({
            message: `Error-${result.error.issues[0].message}`,
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    generateToken(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
    });
});

export const logout = asyncHandler(async (req, res) => {
    await res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        message: "Logout successful",
    });
});

export const updateProfile = asyncHandler(async (req, res) => {
    const {profilePic} = req.body;
    const userId=req.user._id;

    if(!profilePic) {
        return res.status(400).json({
            message: "Profile picture is required",
        });
    } 

    const uploadResponse=await cloudinary.uploader.upload(profilePic)

    if(!uploadResponse) {
        return res.status(400).json({
            message: "Profile picture upload failed",
        });
    }

    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

    if(!updatedUser) {
        return res.status(400).json({
            message: "Profile picture update failed",
        });
    }

    res.status(200).json(updatedUser);
})

export const checkAuth = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
})