import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Baby, Home, LayoutDashboard, PlusSquare, LogOut, Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const links = user ? [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/add-product", icon: PlusSquare, label: "Post" }
  ] : [];

  return (
    <header className="bg-white border-b border-pink-200 px-4 py-3 flex justify-between items-center">

      <Link to="/" className="flex items-center gap-2 text-[#c2185b] font-bold text-xl">
        <Baby />
        ArasBaby
      </Link>

      <div className="hidden md:flex gap-4 items-center">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="flex gap-1 items-center">
            <l.icon size={18} />
            {l.label}
          </Link>
        ))}

        {user ? (
          <button onClick={logout} className="text-red-500 flex items-center gap-1">
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="bg-[#c2185b] text-white px-4 py-1 rounded-full">
            Login
          </button>
        )}
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-white p-4 md:hidden flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <button onClick={logout} className="text-red-500">Logout</button>
        </div>
      )}

    </header>
  );
}

export default Header;