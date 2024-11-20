import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/token.js";
import jwt from 'jsonwebtoken'

//signin
export const userSignup = async(req, res, next)=>{
    try {
        const { name, email, password, mobile, profilePic } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "all fields required" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        

        const newUser = new User({ name, email, password: hashedPassword, mobile, profilePic });
        await newUser.save();

        const token = generateToken(newUser,'user')
        res.cookie('token',token);

        res.json({ message: "user created successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//login
export const userLogin = async(req, res, next)=>{
    try {
        const { name, email, password, mobile, profilePic } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields required" });
        }

        const userExist = await User.findOne({ email: email });

        if (!userExist) {
            return res.status(400).json({ message: "user not exist" });
        }

        const isPasswordMatch = bcrypt.compareSync(password,userExist.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"User not authenticated"});
        }

        const token = generateToken(userExist,'user')
        res.cookie('token',token);
        
        res.json({ message: "user Login successfully" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//restPassword
export const resetPassword = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old password and new password are required" });
        }

        // Get user ID from the token decoded by the userAuth middleware
        const userId = req.user.id;

        // Find the user in the database by their ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the old password matches the current password in the database
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Validate the new password (you can add more checks here, like minimum length)
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "New password must be at least 6 characters long" });
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Respond with a success message
        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//logout
export const logout = (req, res) => {
    try {
        res.clearCookie("token",);

        res.status(200).json({ message: "Successfully logged out." });
    } catch (error) {
        res.status(500).json({ message:"Internal server error." });
    }
};

//profile
export const getProfile = async (req, res, next) => {
    try {
        
     const userId =req.user.id;
     const userProfile = await User.findById(userId).select("-password");


        res.json({ message: "user login successfully", data:userProfile });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//update-profile
export const profileUpdate = async (req, res) => {
    try {
        const { name, email, phone, profilePic } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id; 

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, profilePic },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//checkUser

export const checkUser = async (req, res, next) => {
    try {
        
    res.json({ message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

//deleteAccount
export const deleteUserAccount = async (req, res) => {
    try {
        res.clearCookie("token")
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const userId = req.user.id; 
        
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User account deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};