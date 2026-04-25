import React from 'react';
import { Baby } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#c2185b] text-white mt-10 px-4 py-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Baby size={24} />
            <span className="font-bold text-xl">ArasBaby</span>
          </div>
          <p className="text-sm text-center">
            Safe marketplace for baby and home products
          </p>
          <div className="flex gap-6 text-sm items-center">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Contact</a>
            <Link
              to="/login"
              className="bg-white text-[#c2185b] px-4 py-1 rounded-full font-semibold hover:bg-pink-100 transition"
            >
              Admin
            </Link>
          </div>
        </div>
        <div className="text-center text-xs mt-4 border-t border-white/30 pt-3">
          © {new Date().getFullYear()} ArasBaby. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;