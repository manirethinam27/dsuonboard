import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";

const EventAdd = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    attendees: "",
    location: "",
    category: "",
    description: "",
    registrationLink: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create FormData for Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dsu_events");

      // Cloudinary upload without credentials
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dt6hlzv4b/image/upload",
        formData,
        { 
          withCredentials: false,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // determine creator id from context
      const createdBy = userData?._id;
      if (!createdBy) {
        toast.error("Please login before creating an event");
        setLoading(false);
        return;
      }

      const newEvent = { ...eventData, image: imageUrl, createdBy };

      // backend calls use axios defaults (baseURL and withCredentials) configured in AppContext
      const res = await axios.post("/api/events/create", newEvent);

      if (res.data?.success) {
        toast.success("Event created");
        navigate("/");
      } else {
        toast.error(res.data?.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Event create error:", error);
      toast.error(error.response?.data?.message || error.message || "Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Event</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">Event Title</label>
            <input id="title" type="text" className="border border-gray-300 p-2 w-full rounded" placeholder="Enter event title" value={eventData.title} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 mb-2">Event Date</label>
            <input id="date" type="date" className="border border-gray-300 p-2 w-full rounded" value={eventData.date} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 mb-2">Event Location</label>
            <input id="location" type="text" className="border border-gray-300 p-2 w-full rounded" placeholder="Enter event location" value={eventData.location} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">Event Category</label>
            <select id="category" className="border border-gray-300 p-2 w-full rounded" value={eventData.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Workshop">Workshop</option>
              <option value="Symposium">Symposium</option>
              <option value="Webinar">Webinar</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Fest">Fest</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="attendees" className="block text-gray-700 mb-2">Attendees</label>
            <input id="attendees" type="number" className="border border-gray-300 p-2 w-full rounded" placeholder="Enter number of attendees" value={eventData.attendees} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="registrationLink" className="block text-gray-700 mb-2">Registration Link</label>
            <input id="registrationLink" type="url" className="border border-gray-300 p-2 w-full rounded" placeholder="Enter registration link" value={eventData.registrationLink} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 mb-2">Event Image or Banner</label>
            <input id="image" type="file" accept="image/*" className="border border-gray-300 p-2 w-full rounded" onChange={handleImageChange} />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 mb-2">Event Description</label>
            <textarea id="description" rows="4" className="border border-gray-300 p-2 w-full rounded" placeholder="Enter event description" value={eventData.description} onChange={handleChange}></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-all disabled:opacity-70">
            {loading ? "Uploading..." : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventAdd;
