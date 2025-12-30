import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import userModel from "../model/userModel.js";
import transporter from "../config/nodeMailer.js";

export const register = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
       return res.json({ success: false, message: "Missing details" });
   }

   try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
           return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: 'Registration Successful',
            text:`Welcome to DSU Onboard, ${newUser.name}. Your registration is successful.`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        res.json({ success: true, message: "registration successful" });
    
   } catch (error) {
       res.json({ success: false, message: error.message });
   }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        res.json({ success: true, message: "Logout successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }   
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifiedOtpExpireAt = new Date(Date.now() + 15 * 60 * 1000);

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: 'Password Reset OTP',
            text:`Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        res.json({ success: true, message: "OTP sent successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword){
        return res.json ({ success: false, message: "Missing details" });
    }

    try {
        
        const user = await userModel.findOne({ email });

        if(!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Use the correct fields: verifyOtp and verifiedOtpExpireAt (Date)
        if(!user.verifyOtp || user.verifyOtp !== otp){
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if(!user.verifiedOtpExpireAt || user.verifiedOtpExpireAt < new Date()){
            return res.json({ success: false, message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        user.password = hashedPassword;
        user.verifyOtp = "";
        user.verifiedOtpExpireAt = null;

        await user.save();

        res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
