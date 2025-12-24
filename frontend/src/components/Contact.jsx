import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Contact = () => {
  return (
    <footer className="bg-stone-50 pt-20 pb-10 border-t border-gray-200" id="contact">
      <div className="w-[90%] max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              The Social <span className="text-orange-600">Spot</span>
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Crafting unforgettable dining experiences in the heart of New Delhi. 
              Where flavors meet conversation.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <span className="text-sm">
                  12, Connaught Place, <br />
                  New Delhi, India 110001
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-gray-900 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-orange-600 shrink-0" />
                <a href="mailto:hello@socialspot.in" className="text-sm hover:text-gray-900 transition-colors">
                  hello@socialspot.in
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
              Opening Hours
            </h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span>Mon - Fri</span>
                <span className="font-medium text-gray-900">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span>Saturday</span>
                <span className="font-medium text-gray-900">10:00 AM - 12:00 AM</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span>Sunday</span>
                <span className="font-medium text-gray-900">10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {["Home", "About Us", "Our Menu", "Reservations", "Private Dining"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase().replace(" ", "")} 
                    smooth={true} 
                    className="hover:text-orange-600 cursor-pointer transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-200 group-hover:bg-orange-600 transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 The Social Spot. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>

          <Link to="home" smooth={true} duration={800} className="p-3 bg-gray-900 text-white rounded-full hover:bg-orange-600 transition-colors cursor-pointer shadow-lg">
            <ArrowUp className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Contact;