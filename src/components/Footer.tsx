import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Phone,
  MailOpen,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/assets/1000-tongue.png" 
                alt="Logo"
                className="w-20 h-auto object-contain"
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A music worship gathering — 1,000 voices, 3,000 hearts. One sound
              of praise in London, Summer 2026.
            </p>

            <p className="text-xs text-gray-400 mb-4">
              © 2025 1000 Tongues. All rights reserved. <br />
              <Link to="/policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link> | Cookie Policy | GDPR Compliance
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Instagram, link: "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-blue-950" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link to="/home" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/join-choir" className="hover:text-yellow-400 transition-colors">
                  Join the Choir
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="hover:text-yellow-400 transition-colors">
                  Get Tickets
                </Link>
              </li>
              <li>
                <Link to="/partnership" className="hover:text-yellow-400 transition-colors">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-yellow-400 transition-colors">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Licence */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Licence</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link to="/policy" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy & Copyright
                </Link>
              </li>
              {/* <li>
                <Link to="/policy" className="hover:text-yellow-400 transition-colors">
                  Copyright
                </Link>
              </li> */}
              <li>
                <a href="mailto:info@1000tongues.org" className="hover:text-yellow-400 transition-colors">
                  Email Address
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-yellow-400 mr-2" />
                <span><a href="tel:+441234567890">+44 123 456 7890</a></span>
              </li>
              <li className="flex items-center">
                <MailOpen className="w-4 h-4 text-yellow-400 mr-2" />
                <span><a href="mailto:info@1000tongues.org">info@1000tongues.org</a></span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 text-yellow-400 mr-2" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Mobile Centered */}
        <div className="text-center mt-10 border-t border-gray-700 pt-6 text-xs text-gray-400">
          Designed & Built with ❤️ by <a href="https://yptech.rf.gd" className="hover:text-yellow-400 transition-colors">YP Tech 💻</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;