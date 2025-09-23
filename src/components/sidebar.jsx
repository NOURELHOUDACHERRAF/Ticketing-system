import React from "react";
import { Link } from "react-router-dom";
import { Home, User, Clock, LogOut, X } from "lucide-react";
import Logo from "../assets/LOGO.svg";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside
      className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-blue-900 text-white
        transition-transform duration-300 ease-in-out
        flex flex-col
      `}
    >
      {}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="S logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="text-lg font-bold">SONELDESK</span>
        </div>
        <button
          className="lg:hidden text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {}
      <nav className="flex-1 mt-4">
        <Link
          to="/"
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <Home className="w-5 h-5" /> Accueil
        </Link>

        <Link
          to="/Profile"
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <User className="w-5 h-5" /> Profil
        </Link>

        <Link
          to="/Historique"
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <Clock className="w-5 h-5" /> Historique
        </Link>
      </nav>

      {}
      <div className="p-4">
        <div className="px-4 py-2 hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-3">
          <LogOut className="w-5 h-5" /> Déconnecter
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
