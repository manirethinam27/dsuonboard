import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.jsx';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 relative top-0">
      <div className="flex gap-3 items-center">
        <img src={assets.logo} alt="DSU Logo" className="w-16 object-cover" />
        <h1 className="text-2xl font-bold text-white">
          Dhanalakshmi Srinivasan University
        </h1>
      </div>

      {userData ? (
        <div className="relative">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="h-[50px] w-[50px] rounded-full bg-blue-100 text-center text-blue-700 font-bold font-poppins justify-center items-center flex cursor-pointer absolute top-[-20px] right-[25px] hover:scale-105 transition-transform"
          >
            {userData.name.charAt(0).toUpperCase()}
          </div>

          {showMenu && (
            <div className="absolute top-[60px] right-[25px] bg-white shadow-lg rounded-lg w-[200px] p-3 z-50">
              <p className="text-gray-700 font-semibold mb-3">{userData.name}</p>
              <button onClick={logout} className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">Logout</button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute right-10">Login</button>
      )}
    </div>
  );
};

export default NavBar;
