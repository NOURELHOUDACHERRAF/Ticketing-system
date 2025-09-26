import { useState } from "react";
import { X, Filter } from "lucide-react"; 
import Sidebar from "./sidebar";
import { useUser } from "./UserContext";
import Header from "./Header"; 
import { useNavigate } from "react-router-dom";
import SimpleFiltersModal from "./filtreNotif";
const Notifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    [...Array(6)].map((_, i) => ({
      id: i,
      text: `Ahmed B. a changé l’état du ticket #1452 – Problème de connexion de En cours à Résolu`,
      date: i % 2 === 0 ? "12/09/2025 - 20:28" : "il y a 5 min",
      read: i % 2 === 0, 
    }))
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const user = useUser();
const navigate = useNavigate(); 
  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleFilter = () => {
    alert("Filtrer button clicked!"); 
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
        <Header setSidebarOpen={setSidebarOpen} title="Notifications" />

        {}
        <div className="px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-900">Notifications</h2>
          <button
onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
            style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
          >
            <Filter size={18} className="w-4 h-4 mr-2 text-#0A1F77"/>
            Filtrer
          </button>
        </div>

        {}
        <div className="flex-1 px-6 pb-6 overflow-auto">
          <div className="space-y-0">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-white  shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  {}
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Ahmed B.</span> a changé
                      l’état du ticket{" "}
                      <span className="font-semibold text-blue-600">
                        #1452 – Problème de connexion
                      </span>{" "}
                      de <span className="font-semibold">En cours</span> à{" "}
                      <span className="font-semibold text-green-600">
                        Résolu
                      </span>
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {notif.date}
                    </div>
                  </div>

                  {}
                  {!notif.read && (
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}

                  {}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(notif.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => markAsRead(notif.id)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                      style={{ backgroundColor: "#2f6bff" }}
                    >
                      Consulter
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {}
            {notifications.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-10">
                Aucune notification disponible
              </div>
            )}
          </div>
        </div>
      </div>
     {isFilterOpen && (
  <SimpleFiltersModal
    onClose={() => setIsFilterOpen(false)}
    onApply={(newFilters) => {
      console.log("Applied filters:", newFilters);
      setIsFilterOpen(false);
    }}
  />
)}


    </div>
  );
};

export default Notifications;
