import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Baby, Home, LayoutDashboard, PlusSquare, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = user ? [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/add-product', icon: PlusSquare, label: 'Post' }
  ] : [];

  if (user?.role === 'admin') {
    links.push({ to: '/admin', icon: User, label: 'Admin' });
  }

  return (
    <header className="bg-white border-b border-pink-200 px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-[#c2185b] font-bold text-xl hover:scale-105 transition">
        <Baby size={28} />
        <span>ArasBaby</span>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {links.map(l => (
          <Link 
            key={l.to} 
            to={l.to} 
            className="flex gap-2 items-center text-gray-700 hover:text-[#c2185b] transition font-medium"
          >
            <l.icon size={18} />
            {l.label}
          </Link>
        ))}

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <button 
              onClick={handleLogout} 
              className="text-red-500 flex items-center gap-1 hover:bg-red-50 px-3 py-1 rounded-full transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="bg-[#c2185b] text-white px-5 py-2 rounded-full hover:bg-pink-700 transition font-semibold"
          >
            Login
          </button>
        )}
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg p-4 md:hidden flex flex-col gap-3 z-50">
          {links.map(l => (
            <Link 
              key={l.to} 
              to={l.to} 
              onClick={() => setOpen(false)}
              className="flex gap-2 items-center py-2 hover:text-[#c2185b]"
            >
              <l.icon size={18} />
              {l.label}
            </Link>
          ))}
          {user && (
            <>
              <div className="border-t pt-2 mt-2">
                <p className="text-sm text-gray-600 mb-2">Hi, {user.name}</p>
                <button onClick={handleLogout} className="text-red-500 flex items-center gap-1 w-full">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;