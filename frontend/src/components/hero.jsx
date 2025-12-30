import React, { useContext } from 'react';
import '../index.css'
import NavBar from './navBar'
import { AppContext } from '../context/AppContext.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCalendar,faClock, faBookBookmark,faMedal,faStar } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div id='header'>
      <NavBar/>
      <div className='flex flex-col gap-4 justify-center items-center h-[90vh] w-[100%] relative'>
        <FontAwesomeIcon icon={faUser} className="absolute right-20 opacity-60 animate-float -z-0" size='2xl' style={{color: "#a7acb4"}} />
        <FontAwesomeIcon icon={faCalendar} size="2xl" style={{color: "#a7acb4"}} className='absolute left-20 top-64 opacity-60 animate-float1 -z-0'/>
        <FontAwesomeIcon icon={faClock} style={{ color: "#a7acb4" }} className="absolute left-60 bottom-40 opacity-60 animate-float text-[2rem] -z-0"/>
        <FontAwesomeIcon icon={faBookBookmark} style={{ color: "#a7acb4" }} className="absolute right-60 top-40 opacity-60 animate-float1 text-[2rem] -z-0"/>
        <FontAwesomeIcon icon={faMedal} style={{ color: "#a7acb4" }} className="absolute left-[30rem] top-40 opacity-60 animate-float text-[2rem] -z-0"/>
        <FontAwesomeIcon icon={faStar} style={{ color: "#a7acb4" }} className="absolute right-[30rem] bottom-20 opacity-60 animate-float1 text-[2rem] -z-0"/>
        {userData && <h2 className='text-xl font-semibold text-white'>Hello, {userData.name}!</h2>}
        <h1 className='text-4xl font-bold text-white'>🚀 Welcome to DSU OnBoard</h1>
        <h4 className='text-center text-md text-white'>
          Stay updated with the latest happenings, workshops, fests, and<br />announcements across DSU.
          Never miss an opportunity to learn, connect, and celebrate!
        </h4>
        <button className='bg-white text-blue-500 font-bold px-4 py-2 rounded hover:scale-105 transition-transform duration-200' onClick={() => document.getElementById("eventpage")?.scrollIntoView({ behavior: "smooth" })}>
          Explore Events
        </button>

      </div>
      <div className='flex flex-row justify-around items-center'>
        <div className='text-center flex flex-col text-white text-[1.5rem] bg-white/10 backdrop-blur-md p-4 rounded-md h-[225px] w-[200px] border border-white/20 font-bold justify-center items-center transform hover:-translate-y-2 transition-transform duration-300'>
          <h1>25+ </h1><h1>Events Monthly</h1>
        </div>
        <div className='text-center flex flex-col text-white text-[1.5rem] bg-white/10 backdrop-blur-md p-4 rounded-md h-[225px] w-[200px] border border-white/20 font-bold justify-center items-center transform hover:-translate-y-2 transition-transform duration-300'>
          <h1>15+ </h1><h1>Active Clubs</h1>
        </div>
        <div className='text-center flex flex-col text-white text-[1.5rem] bg-white/10 backdrop-blur-md p-4 rounded-md h-[225px] w-[200px] border border-white/20 font-bold justify-center items-center transform hover:-translate-y-2 transition-transform duration-300'>
          <h1>5+ </h1><h1>Workshops Weekly</h1>
        </div>
        <div className='text-center flex flex-col text-white text-[1.5rem] bg-white/10 backdrop-blur-md p-4 rounded-md h-[225px] w-[200px] border border-white/20 font-bold justify-center items-center transform hover:-translate-y-2 transition-transform duration-300'>
          <h1>2000+ </h1><h1>Students</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
