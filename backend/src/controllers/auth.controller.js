import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { userSchema, loginSchema } from "../lib/utils/types.js";
import { generateToken } from "../lib/utils/tokenGen.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
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
    } catch (error) {
        console.log("Error in signup controller -", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
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
    } catch (error) {
        console.log("Error in login controller -", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const logout = async (req, res) => {
    try {
        await res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
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

        res.status(200).json({updatedUser});

    } catch (error) {
        console.log("Error in updateProfile controller -", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller -", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}