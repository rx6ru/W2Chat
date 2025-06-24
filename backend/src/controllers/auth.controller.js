import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { userSchema } from "../lib/utils/types.js";
import { generateToken } from "../lib/utils/tokenGen.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
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

        const salt = await bcrypt.genSalt(password, 10);
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
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const login = (req, res) => {
    res.send("login");
};

export const logout = (req, res) => {
    res.send("logout");
};
