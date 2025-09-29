import { useState } from "react";
import { Search, Calendar, Menu } from "lucide-react";
import { Link, usePage, router } from "@inertiajs/react";
import { route } from "ziggy-js";

const Header = ({ setSidebarOpen }) => {
  const { auth } = usePage().props;
  const user = auth?.user;

  const fullName = user ? `${user.prenom ?? ""} ${user.nom ?? ""}`.trim() : "";

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.get(route("admin.search"), { query: searchQuery });
    }
  };

  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
      {}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <p className="text-lg sm:text-2xl font-medium text-gray-800">
          Bonjour, {fullName}
        </p>
      </div>

      {}
      <div className="flex items-center gap-4">
        {}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-blue-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {}
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>
            {day} {month}
          </span>
        </div>

        {}
        <Link
          href={route("admin.profile.edit")}
          className="flex items-center gap-2 hover:opacity-80"
        >
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
            {user?.prenom ? user.prenom[0] : "?"}
          </div>
          <div className="hidden sm:block text-sm">
            <div className="font-medium">{fullName}</div>
            <div className="text-gray-500 text-xs">
              {user?.role ?? "Utilisateur"}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
