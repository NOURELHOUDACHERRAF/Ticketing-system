import { useState, useEffect } from "react";
import { Search, Bell, Calendar, Filter, List } from "lucide-react";
import FiltersModal from "./filtre";
import SortModal from "./trier";
import Sidebar from "./sidebar";
import { useUser } from "./UserContext";
import Header from "./Header";

const TicketDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("attributed");
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priorities: [],
    statuses: [],
    creationDate: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortType, setSortType] = useState("creation");

  const user = useUser();
  const fullName = `${user.firstName} ${user.lastName}`;

  // Mock data
  const mockTickets = [
    {
      id: 1456,
      subject: "échec de connexion",
      category: "Technique",
      status: "demande d’aide",
      statusColor: "text-red-600",
      rowBg: "bg-red-50",
      creationDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      priority: "Haute",
      priorityColor: "text-orange-600",
      assignedTo: "vous.",
    },
    {
      id: 1457,
      subject: "problème de réseau",
      category: "Support",
      status: "Traité",
      statusColor: "text-green-600",
      creationDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      priority: "Moyenne",
      priorityColor: "text-blue-600",
      assignedTo: "Jhon B.",
    },
  ];

  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  
  let filteredTickets =
    activeTab === "attributed"
      ? tickets.filter((t) => t.assignedTo !== "non attribué")
      : tickets.filter((t) => t.assignedTo === "non attribué");

  if (filters.categories.length > 0) {
    filteredTickets = filteredTickets.filter((t) =>
      filters.categories.includes(t.category)
    );
  }
  if (filters.priorities.length > 0) {
    filteredTickets = filteredTickets.filter((t) =>
      filters.priorities.includes(t.priority)
    );
  }
  if (filters.statuses.length > 0) {
    filteredTickets = filteredTickets.filter((t) =>
      filters.statuses.includes(t.status)
    );
  }
  if (filters.creationDate) {
    filteredTickets = filteredTickets.filter(
      (t) => t.creationDate === filters.creationDate
    );
  }

  
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortType === "creation") {
      return new Date(b.creationDate) - new Date(a.creationDate);
    }
    if (sortType === "lastUpdate") {
      return new Date(b.lastUpdate) - new Date(a.lastUpdate);
    }
    return 0;
  });

  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("fr-FR", { month: "short" });

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
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("attributed")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "attributed"
                  ? "bg-blue-700 text-white font-medium"
                  : "bg-gray-100 text-gray-600"
              }`}
               style={{
                  borderColor: "#1976D2",
                  backgroundColor: "#1976D2",
                  color: "white",
                }}
            >
              Tickets attribués
            </button>
            <button
              onClick={() => setActiveTab("not-attributed")}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "not-attributed"
                  ? "bg-blue-700 text-white font-medium"
                  : "bg-gray-100 text-gray-600"
              }`}
               style={{
                  borderColor: "#1976D2",
                  backgroundColor: "#1976D2",
                  color: "white",
                }}
            >
              Tickets non attribués
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm"
              style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
            >
              <Filter className="w-4 h-4" /> Filtrer
            </button>
            <button
              onClick={() => setIsSortModalOpen(true)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm"
              style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
            >
              <List className="w-4 h-4" /> Trier
            </button>
          </div>
        </div>

        {}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {[
                    "ID du ticket",
                    "Sujet",
                    "Catégorie",
                    "Statut",
                    "Date de création",
                    "Dernière mise à jour",
                    "Priorité",
                    "Attribué à",
                    "",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedTickets.map((t) => (
                  <tr
                    key={t.id}
                    className={`${t.rowBg ? t.rowBg : "bg-white"} hover:bg-gray-50`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{t.id}</td>
                    <td className="px-4 py-3 text-gray-700">{t.subject}</td>
                    <td className="px-4 py-3 text-gray-700">{t.category}</td>
                    <td className={`px-4 py-3 font-medium ${t.statusColor}`}>
                      {t.status}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{t.creationDate}</td>
                    <td className="px-4 py-3 text-gray-700">{t.lastUpdate}</td>
                    <td className={`px-4 py-3 font-medium ${t.priorityColor}`}>
                      {t.priority}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{t.assignedTo}</td>
                    <td className="px-4 py-3">
                      <button
                        className="w-full mt-3 px-4 py-2 rounded-lg flex items-center justify-center shadow-md transition-colors"
                        style={{ backgroundColor: "#2f6bff", color: "white" }}
                      >
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedTickets.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Aucun ticket trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {}
      {isFilterOpen && (
        <FiltersModal
          onClose={() => setIsFilterOpen(false)}
          onApply={setFilters}
          initialFilters={filters}
        />
      )}
      {isSortModalOpen && (
        <SortModal
          onApply={(selected) => setSortType(selected)}
          onClose={() => setIsSortModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketDashboard;
