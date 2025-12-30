import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx"; 
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ResetPassword = () => {
  const { backend_url } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backend_url}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backend_url}/api/auth/reset-password`, { email, otp, newPassword });
      if (data.success) {
        toast.success("Password reset successfully!");
        setOtpSent(false);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#06b6d4] via-[#2563eb] to-[#6366f1]">
      <form onSubmit={otpSent ? resetPasswordHandler : sendOtpHandler} className="flex flex-col gap-4 justify-center items-center p-8 rounded-lg shadow-lg bg-sky-900">
        <h1 className="text-2xl text-white font-bold">Reset Password</h1>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-1 rounded w-64 border-none outline-none" />

        {otpSent && (
          <>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-1 rounded w-64 border-none outline-none" />
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-1 rounded w-64 border-none outline-none" />
          </>
        )}

        <button className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600">
          {otpSent ? "Reset Password" : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
