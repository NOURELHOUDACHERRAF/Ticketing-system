import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import Logo from "@/../assets/LOGO.svg";

import {
  Home,
  UserCog,
  Users,
  Layers,
  Building,
  LogOut,
  User,
} from "lucide-react";

export default function Sidebar() {
  const { auth } = usePage().props; 

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      {}
      <div className="flex items-center gap-2 p-4 border-b border-blue-700">
                <img src={Logo} alt="Logo" className="h-10 w-auto" />

        <span className="text-lg font-bold">SONELDESK</span>
      </div>

      {}
      <nav className="flex-1 mt-4 space-y-1">
        <Link
          href={route("admin.home")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
        >
          <Home className="w-5 h-5" /> Dashboard
        </Link>

        <Link
          href={route("admin.agents.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
        >
          <UserCog className="w-5 h-5" /> Agents
        </Link>

        <Link
          href={route("admin.users.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
        >
          <Users className="w-5 h-5" /> Utilisateurs
        </Link>

        <Link
          href={route("admin.groups.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
        >
          <Layers className="w-5 h-5" /> Groupes
        </Link>

        <Link
          href={route("admin.units.index")}
          className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
        >
          <Building className="w-5 h-5" /> Unités
        </Link>
        <Link
  href={route("admin.categories.index")}
  className="px-4 py-2 hover:bg-blue-700 flex items-center gap-3"
>
  <Building className="w-5 h-5" /> Categories
</Link>


        {}
      <Link
  href={route("admin.profile.edit")}
  className={`px-4 py-2 hover:bg-blue-700 flex items-center gap-3 ${
    route().current("admin.profile.edit") ? "bg-blue-100 text-blue-600" : "text-white"
  }`}
>
  <User className="w-5 h-5" /> Profil
</Link>

      </nav>

      {}
      <Link
        href={route("admin.logout")}
        method="post"
        as="button"
        className="w-full px-4 py-2 flex items-center gap-3 hover:bg-blue-700"
      >
        <LogOut className="w-5 h-5" /> Déconnexion
      </Link>
    </aside>
  );
}
