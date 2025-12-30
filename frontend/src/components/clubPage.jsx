import logo1 from "../assets/lo1.png";
import logo2 from "../assets/lo2.png";
import logo3 from "../assets/lo3.png";
import banner1 from "../assets/ba1.png";
import banner2 from "../assets/ba2.png";
import banner3 from "../assets/ba3.png";

const ClubPage = () => {
  return (
    <div className="container mx-auto px-6 py-20 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-4 text-black">
          🧩{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Explore Campus Clubs
          </span>
        </h1>
        <p className="text-lg text-gray-700">
          Discover a variety of student clubs and organizations to join and
          enhance your campus life!
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          
          {/* Banner */}
          <div className="relative h-48">
            <img
              className="w-full h-full object-cover bg-gray-200"
              src={logo1}
              alt="Club Banner"
            />

            {/* Club Logo */}
            <img
              className="w-16 h-16 rounded-full bg-gray-100 border-4 border-white absolute -bottom-8 left-4 object-cover"
              src={banner1}
              alt="Club Logo"
            />
          </div>

          {/* Content */}
          <div className="p-6 pt-12 flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
               🏆 Sports Club – Play • Compete • Excel
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed">The Sports Club promotes physical fitness, teamwork, and sportsmanship among students. It provides opportunities for students to participate in various indoor and outdoor sports, helping them stay active, disciplined, and competitive. The club encourages a healthy balance between academics and athletics.p</p>

            <div className="space-y-1 text-gray-700 text-sm">
              <div className="flex items-center gap-2">📍 <span>ground floor - SET Block</span></div>
              <div className="flex items-center gap-2">👥 <span>250+</span></div>
              <div className="flex items-center gap-2">📅 <span>***********</span></div>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              Join Club
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          
          {/* Banner */}
          <div className="relative h-48">
            <img
              className="w-full h-full object-cover bg-gray-200"
              src={logo2}
              alt="Club Banner"
            />

            {/* Club Logo */}
            <img
              className="w-16 h-16 rounded-full bg-gray-100 border-4 border-white absolute -bottom-8 left-4 object-cover"
              src={banner2}
              alt="Club Logo"
            />
          </div>

          {/* Content */}
          <div className="p-6 pt-12 flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              💃🕺 Dance Club - Express Beyond Words
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed">
              The Dance Club is a vibrant platform for students who love rhythm, movement, and self-expression. It brings together dancers of all styles and skill levels to explore creativity, build confidence, and perform with passion. From classical to contemporary, hip-hop to freestyle, the club celebrates every form of dance.
            </p>

            <div className="space-y-1 text-gray-700 text-sm">
              <div className="flex items-center gap-2">📍 <span>5th Floor - Academic Block</span></div>
              <div className="flex items-center gap-2">👥 <span>170+</span></div>
              <div className="flex items-center gap-2">📅 <span>************</span></div>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              Join Club
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          
          {/* Banner */}
          <div className="relative h-48">
            <img
              className="w-full h-full object-cover bg-gray-200"
              src={logo3}
              alt="Club Banner"
            />

            {/* Club Logo */}
            <img
              className="w-16 h-16 rounded-full bg-gray-100 border-4 border-white absolute -bottom-8 left-4 object-cover"
              src={banner3}
              alt="Club Logo"
            />
          </div>

          {/* Content */}
          <div className="p-6 pt-12 flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-gray-900">
              💻 Coding Club - Learn • Code • Innovate
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed">
              The Coding Club is a student-driven community that aims to develop strong programming, problem-solving, and logical thinking skills among students. The club provides a collaborative platform where members can learn coding from basics to advanced levels through hands-on practice, challenges, and real-time projects.
            </p>

            <div className="space-y-1 text-gray-700 text-sm">
              <div className="flex items-center gap-2">📍 <span>IBM LAB </span></div>
              <div className="flex items-center gap-2">👥 <span>300+</span></div>
              <div className="flex items-center gap-2">📅 <span>***********</span></div>
            </div>

            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              Join Club
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ClubPage;
