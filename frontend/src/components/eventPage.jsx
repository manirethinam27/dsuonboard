import { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`,
          { withCredentials: true }
        );

        const sortedEvents = (data.events || []).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredEvents(filtered);
    }
  };

  const categories = ["All", "Workshop", "Symposium", "Webinar", "Fest", "Hackathon", "Other"];

  return (
    <div className="container bg-gray-100 mx-auto px-6 py-20" id="eventpage">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-4 text-black">
          🎯{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Upcoming Events
          </span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Don’t miss out on the exciting opportunities happening around campus!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 
                ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading events...</p>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {event.category}
                </div>
              </div>

              <div className="p-6  rounder flex flex-col gap-3">
                <h2 className="text-2xl font-bold text-black">{event.title}</h2>
                <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>

                <div className="flex items-center gap-2 text-gray-700">📅 <span>{new Date(event.date).toLocaleDateString("en-GB", {
                                                                                  day: "2-digit",
                                                                                  month: "2-digit",
                                                                                  year: "2-digit",
                                                                                })
                                                                          }
                                                                          </span></div>
                <div className="flex items-center gap-2 text-gray-700">📍 <span>{event.location}</span></div>
                <div className="flex items-center gap-2 text-gray-700 text-sm">👥 <span>{event.attendees} attending</span></div>

                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="mt-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-semibold hover:shadow-[0_0_15px_rgba(147,51,234,0.7)] transition-all">
                  Register Now
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 col-span-full text-center text-lg font-medium">
          No events found for <span className="text-blue-600">{activeCategory}</span>.
        </p>
      )}
    </div>
  );
};

export default EventPage;
