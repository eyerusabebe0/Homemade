import React from "react";
import { Baby } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#c2185b] text-white mt-10 px-4 py-6">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Baby size={22} />
          <span className="font-bold text-lg">ArasBaby</span>
        </div>

        {/* TEXT */}
        <p className="text-sm text-center">
          Safe marketplace for baby and home products
        </p>

        {/* LINKS */}
        <div className="flex gap-4 text-sm items-center">

          <a href="#" className="hover:underline">
            About
          </a>

          <a href="#" className="hover:underline">
            Support
          </a>

          <a href="#" className="hover:underline">
            Contact
          </a>

          {/* ADMIN LINK */}
          <Link
            to="/login"
            className="bg-white text-[#c2185b] px-3 py-1 rounded-full font-semibold hover:bg-pink-100"
          >
            Admin
          </Link>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs mt-4 border-t border-white/30 pt-3">
        © {new Date().getFullYear()} ArasBaby. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;