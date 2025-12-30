import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { backend_url, setIsLoggedIn, getUserData, isLoggedIn } = useContext(AppContext);
  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === "sign up") {
        const { data } = await axios.post(`${backend_url}/api/auth/register`, {
          name,
          email,
          password
        });
        if (data?.success) {
          // After register the cookie is set by backend; fetch user data
          await getUserData();
          setIsLoggedIn(true);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backend_url}/api/auth/login`, {
          email,
          password
        });
        if (data?.success) {
          // fetch user details and persist locally
          await getUserData();
          setIsLoggedIn(true);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#06b6d4] via-[#2563eb] to-[#6366f1]'>
      <div className='flex flex-col gap-4 justify-center items-center p-8 rounded-lg shadow-lg bg-sky-900'>
        <h1 className='text-2xl text-white font-bold'>
          {state === "sign up" ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 justify-center items-center'>
          {state === "sign up" && (
            <input
              type="text"
              placeholder='Full Name'
              className='border p-1 rounded w-64 border-none outline-none'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder='Email'
            className='border p-1 rounded w-64 border-none outline-none'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            className='border p-1 rounded w-64 border-none outline-none'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {state === "login" && (<a href="/reset-password" className='text-blue-500 hover:underline'>Forgot Password?</a>)}
          <button className='bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600'>
            {state === "sign up" ? "Sign Up" : "Login"}
          </button>
          {state === "sign up" ?
            <p>Already have an account? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setState("login")}>Login</span></p>
            : <p>I don't have an account? <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => setState("sign up")}>Sign Up</span></p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
