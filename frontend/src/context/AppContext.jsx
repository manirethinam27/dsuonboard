import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize axios defaults
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = backend_url;
  }, [backend_url]);

  // Handle unauthorized responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Load user data on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check localStorage first
        const stored = localStorage.getItem("userData");
        if (stored) {
          const user = JSON.parse(stored);
          setUserData(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth init error:", error);
        localStorage.removeItem("userData");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (!data.success) throw new Error(data.message);
      setUserData(data.userData);
      setIsLoggedIn(true);
      localStorage.setItem("userData", JSON.stringify(data.userData));
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      localStorage.removeItem("userData");
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUserData(null);
      setIsLoggedIn(false);
      localStorage.removeItem("userData");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    logout: handleLogout,
    backend_url
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
