import express from "express";
import { register, login, logout, sendResetOtp, resetPassword } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/send-reset-otp', sendResetOtp);
authRoute.post('/reset-password', resetPassword);

export default authRoute;
