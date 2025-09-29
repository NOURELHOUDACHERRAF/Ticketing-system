import { Search, Bell, Calendar, Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const AgentHeader = ({ setSidebarOpen, searchQuery, setSearchQuery }) => {
  const { auth } = usePage().props;
  const agent = auth?.user;

  const fullName = [agent?.nom, agent?.prenom].filter(Boolean).join(" ") || "Agent";
  const userInitial = fullName.charAt(0).toUpperCase();
  const userRole = agent?.est_superviseur ? "Superviseur" : "Agent";

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });

  return (
    <header className="bg-white border-b px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <p className="text-lg sm:text-2xl font-medium text-gray-800">
          Bonjour, {fullName} !
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 min-w-[200px]"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span>
            {day} {month}
          </span>
        </div>

        <Link
        href={route('agent.notifications.index')}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
      </Link>

        <Link href={route("agent.profile")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white text-sm">
            {userInitial}
          </div>
          <div className="hidden sm:block text-sm">
            <div className="font-medium text-gray-900">{fullName}</div>
            <div className="text-gray-500 text-xs">{userRole}</div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AgentHeader;


