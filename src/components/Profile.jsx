import  { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  User,
  Clock,
  LogOut,
  Search,
  Calendar,
  Bell,
  Menu,
  X,
  Edit,
} from "lucide-react";
import Sidebar from "./sidebar";
import { useUser } from "./UserContext"; 
import Header from "./Header";
const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const user = useUser();
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });
const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="flex h-screen w-screen overflow-hidden font-poppins bg-blue-50">
      {}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {}
      <main className="flex-1 flex flex-col min-w-0">
        {}
  <Header setSidebarOpen={setSidebarOpen} title="Profil" />

     {}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <section className="relative bg-white rounded-l shadow-md max-w-2xl w-full p-6 sm:p-8">
  {}
  <button className="absolute top-4 right-4 bg-blue-100 text-blue-600 p-2 rounded-full shadow hover:bg-blue-200">
    <Edit size={18} className="text-blue-500" />
  </button>

  {}
  <div className="flex flex-col items-center mb-8">
    <div className="relative">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="avatar"
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100"
      />
    </div>
  </div>

           {}
            <div className="grid md:grid-cols-3 gap-6 text-gray-700 mb-8">
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-semibold">{user.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prénom</p>
                <p className="font-semibold">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Identifiant</p>
                <p className="font-semibold">Ali.b</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unité</p>
                <p className="font-semibold">Tlemcen (DTLM)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <a
                  href="mailto:Ali.Bouali@sonalgaz.dz"
                  className="font-semibold text-blue-600 underline"
                >
                  Ali.Bouali@sonalgaz.dz
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Numéro de téléphone</p>
                <p className="font-semibold">0551234567</p>
              </div>
            </div>


              {}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm text-center">
                <thead className="bg-gray-50 text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">Tickets totaux</th>
                    <th className="px-6 py-3">Résolus</th>
                                        <th className="px-6 py-3">En attente</th>

                    <th className="px-6 py-3">En cours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 font-semibold text-gray-700">11</td>
                    <td className="px-6 py-3 font-semibold text-green-600">8</td>
                    <td className="px-6 py-3 font-semibold text-black-600">22</td>
                    <td className="px-6 py-3 font-semibold text-orange-600">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
