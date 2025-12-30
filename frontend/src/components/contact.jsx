import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer.jsx";

const Contact = () => {
  return (
    <div id="contact-bg" className="bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-4xl mx-auto text-center py-16 px-6">
        <h1 className="text-white text-4xl font-bold mb-4">🔔 Stay Connected</h1>
        <p className="text-gray-700 mb-8">
          Follow us on social media for updates, announcements, and event highlights.
        </p>

        <div className="flex flex-row space between justify-around mb-12 items-center">
            <div className="flex flex-col gap-4 text-lg">
                <a className="flex items-center gap-3" href="https://www.linkedin.com/company/dsu" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>

                <a className="flex items-center gap-3" href="https://www.instagram.com/dsuonboard" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>

                <a className="flex items-center gap-3" href="mailto:info@dsu.edu">
                    <FontAwesomeIcon icon={faEnvelope} /> info@dsu.edu
                </a>
            </div>

            <div>
                <div className="bg-gray-200 flex flex-col gap-4 max-w-md mx-auto p-6 rounded-lg">
                    <input type="text" placeholder="Enter your name" />
                    <input type="email" placeholder="Enter your email" />
                    <textarea placeholder="Your message"></textarea>
                    <button type="submit">Send Message</button>
                </div>
            </div>
        </div>
      </div>
        <Footer />
    </div>
    
  );
};

export default Contact;
