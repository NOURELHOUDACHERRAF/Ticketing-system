import  { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Home,
  User,
  Clock,
  LogOut,
  Bell,
  Calendar,
  X,
  Menu,
} from "lucide-react";
import Sidebar from "./sidebar";
import { useUser } from "./UserContext";
import Header from "./Header";

const HistoryDashboard = () => {
  const user = useUser();

    const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      action: "SaraK a refusé la solution du ticket",
      ticketId: "#1408",
      ticketSubject: "mot de passe oublié",
      date: "12/09/2025",
      time: "il y a 5min",
      type: "refusal",
    },
    {
      id: 2,
      action: "Vous avez mis à jour le statut du ticket",
      ticketId: "#1478",
      ticketSubject: "mot de passe oublié",
      status: "en traité",
      date: "12/09/2025",
      time: "il y a 15min",
      type: "status_update",
    },
    {
      id: 3,
      action: "Vous avez mis à jour le statut du ticket",
      ticketId: "#1478",
      ticketSubject: "mot de passe oublié",
      status: "en traité",
      date: "11/09/2025",
      time: "20:28",
      type: "status_update",
    },
  ]);


  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });
  const fullName = `${user.firstName} ${user.lastName}`;

  const removeHistoryItem = (id) => {
    setHistoryItems(historyItems.filter((item) => item.id !== id));
  };

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
      <div className="flex-1 flex flex-col bg-blue-50">
        {}
  <Header setSidebarOpen={setSidebarOpen} title="Historique" />

        {}
        <div className="px-6 py-6">
          <h2 className="text-2xl font-medium text-gray-900">Historique</h2>
        </div>

        {}
        <div className="flex-1 px-6 pb-6 overflow-auto">
          <div className="space-y-0">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="bg-white  shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-gray-700">
                      <span>{item.action}</span>
                      <span className="font-semibold text-gray-900">
                        {item.ticketId} - {item.ticketSubject}
                      </span>
                      {item.status && (
                        <span className="text-gray-700">({item.status})</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {item.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{item.time}</span>
                    <button
                      onClick={() => removeHistoryItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {historyItems.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-10">
                Aucun historique disponible
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDashboard;
