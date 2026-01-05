import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Home, Phone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Briefcase className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">Job Portal</h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium"
            >
              <Home size={18} />
              Home
            </Link>
           <Link
            to="/contacts"
             className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium"
            >
            <Phone size={18} /> Contact Us
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;