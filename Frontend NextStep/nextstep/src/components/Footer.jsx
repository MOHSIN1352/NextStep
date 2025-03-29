import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f1ead8] py-10 px-6 text-black border-t-1 border-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold">NextStep</h2>
          <p className="text-gray-700 mt-2">
            Empowering people through tailored support and authentic
            connections.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-600">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-gray-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-600 mt-8 border-t pt-4">
        &copy; {new Date().getFullYear()} NextStep. All rights reserved.
      </div>
    </footer>
  );
}
