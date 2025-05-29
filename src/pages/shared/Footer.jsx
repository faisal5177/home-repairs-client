import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 rounded-t-3xl">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
          <img
              className="w-[60px] h-auto rounded-full"
              src="https://i.ibb.co/gLzZFk9R/homecare-solutions-logo.jpg"
              alt="Homecare Solutions Logo"
            />
            <h2 className="text-3xl font-bold text-green-400">Home</h2>
            <span className="font-bold text-green-400 ml-[100px]">Repairs</span>
            <p className="text-gray-400 mt-3">
              Ensuring quality homecare services with compassion and expertise. We are here to make life easier and better for your loved ones.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-300 transition">Services</a></li>
              <li><a href="#" className="hover:text-green-300 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-300 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Contact Us</h3>
            <p className="text-gray-400">📍 Dhaka, Bangladesh</p>
            <p className="text-gray-400">📞 +880 1234-567890</p>
            <p className="text-gray-400">✉️ support@homecaresolutions.com</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Social Media Section */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-2xl text-gray-400 hover:text-green-300 transition"><FaFacebookF /></a>
          <a href="#" className="text-2xl text-gray-400 hover:text-green-300 transition"><FaTwitter /></a>
          <a href="#" className="text-2xl text-gray-400 hover:text-green-300 transition"><FaInstagram /></a>
          <a href="#" className="text-2xl text-gray-400 hover:text-green-300 transition"><FaLinkedinIn /></a>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 mt-6">
          <p>© {new Date().getFullYear()} Homecare Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
