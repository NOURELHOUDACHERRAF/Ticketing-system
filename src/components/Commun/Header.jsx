import { Search, Bell, Calendar, Menu } from "lucide-react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = ({ setSidebarOpen }) => {
  const user = useUser();
  const fullName = `${user.firstName} ${user.lastName}`;
  const navigate = useNavigate();

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });

  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
      {}
      <div className="flex items-center gap-4">
        {}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <p className="text-lg sm:text-2xl font-medium text-gray-800">
          Bonjour , {user.firstName}!
        </p>
      </div>

      {}
      <div className="flex items-center gap-4">
        {}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-10 pr-4 py-2 rounded-lg bg-blue-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {}
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>
            {day} {month}
          </span>
        </div>

        {}
        <button
          className="relative text-gray-600 hover:text-gray-800"
         onClick={() => navigate("/notifications", { replace: true })}

        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {}
<Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
    {user.firstName[0]}
  </div>
  <div className="hidden sm:block text-sm">
    <div className="font-medium">{fullName}</div>
    <div className="text-gray-500 text-xs">{user.role}</div>
  </div>
</Link>
      </div>
    </header>
  );
};

export default Header;
