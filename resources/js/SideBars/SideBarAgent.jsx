import { Link } from "@inertiajs/react";
import { Home, User, Clock, LogOut, TicketIcon, X } from "lucide-react";

const SidebarAgent = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <aside
      className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-blue-900 text-white
        transition-transform duration-300 ease-in-out
        flex flex-col
        justify-between
      `}
    >
      <div>
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <div className="flex items-center gap-2">
            <img src="/assets/LOGO.svg" alt="Logo" className="h-8 w-auto" />
            <span className="text-lg font-bold">SONELDESK</span>
          </div>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Link
          href={route("agent.dashboard")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <Home className="w-5 h-5" /> Accueil
        </Link>

        {/* <Link
          href={route("agent.tickets.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <TicketIcon className="w-5 h-5" /> Tickets
        </Link> */}

        <Link
          href={route("agent.historiques.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <Clock className="w-5 h-5" /> Historique
        </Link>

        <Link
          href={route("agent.profile")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3 cursor-pointer"
        >
          <User className="w-5 h-5" /> Profil
        </Link>
      </div>

      <div className="p-4 border-t border-blue-700">
        <Link
          href={route("agent.logout")}
          method="post"
          as="button"
          className="px-4 py-2 hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-3 w-full text-left"
        >
          <LogOut className="w-5 h-5" /> Déconnecter
        </Link>
      </div>
    </aside>
  );
};

export default SidebarAgent;


