import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  List,
  Home,
  User,
  Clock,
  LogOut,
  Bell,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import FiltersModal from "./filtre";
import SortModal from "./trier";
import Sidebar from "./sidebar";
import { useUser } from "./UserContext";
import Header from "./Header";
import CreateTicketModal from "./nvTicket";
import SonelDeskTicket from "./DescriptionTicket";

const HelpdeskInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 1456,
      subject: "échec de connexion",
      category: "Technique",
      status: "Urgent",
      statusColor: "text-red-600 bg-red-50",
      creationDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      priority: "Haute",
      priorityColor: "text-orange-600",
      assignedTo: "Ahmed B.",
    },
    {
      id: 1457,
      subject: "problème d’impression",
      category: "Matériel",
      status: "Traité",
      statusColor: "text-green-600 bg-green-50",
      creationDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      priority: "Moyenne",
      priorityColor: "text-blue-600",
      assignedTo: "Ahmed B.",
    },
    {
      id: 1458,
      subject: "bug logiciel",
      category: "Technique",
      status: "En cours",
      statusColor: "text-blue-600 bg-blue-50",
      creationDate: "2025-09-10",
      lastUpdate: "2025-09-11",
      priority: "Critique",
      priorityColor: "text-red-600",
      assignedTo: "Ahmed B.",
    },
  ]);

  const [activeTab, setActiveTab] = useState("attributed");
  const [filters, setFilters] = useState({
    categories: [],
    priorities: [],
    statuses: [],
    creationDate: "",
  });
  const [sortType, setSortType] = useState("creation");

  const user = useUser();
  const fullName = `${user.firstName} ${user.lastName}`;


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

  
  const handleAddTicket = (newTicket) => {
    setTickets((prev) => [
      ...prev,
      {
        ...newTicket,
        id: Date.now(),
        creationDate: new Date().toISOString().split("T")[0],
        lastUpdate: new Date().toISOString().split("T")[0],
      },
    ]);
    setIsModalOpen(false);
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
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          {}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            {}
            <button
              className="w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center transition-colors shadow-md"
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: "#0A1F77", color: "white" }}
            >
              <Plus className="w-5 h-5 mr-2 text-white" />
              Nouveau ticket
            </button>

            {}
            <div className="flex space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center transition-colors shadow-md"
                style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
              >
                <Filter className="w-4 h-4 mr-2 text-#0A1F77" />
                Filtrer
              </button>
              <button
                onClick={() => setIsSortModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center transition-colors shadow-md"
                style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
              >
                <List className="w-4 h-4 mr-2 text-#0A1F77" />
                Trier
              </button>
            </div>
          </div>

          {}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Sujet
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Catégorie
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Création
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mise à jour
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Priorité
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Attribué
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ticket.subject}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ticket.category}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${ticket.statusColor}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ticket.creationDate}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ticket.lastUpdate}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-sm font-medium ${ticket.priorityColor}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {ticket.assignedTo}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/ticket/${ticket.id}`}
                          className="px-4 py-2 rounded-lg flex items-center justify-center shadow-md transition-colors"
                          style={{ backgroundColor: "#2f6bff", color: "white" }}
                        >
                          Consulter
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {}
            <div className="md:hidden divide-y divide-gray-200">
              {sortedTickets.map((ticket) => (
                <div key={ticket.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      #{ticket.id}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${ticket.statusColor}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <b>Sujet :</b> {ticket.subject}
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <b>Catégorie :</b> {ticket.category}
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <b>Priorité :</b>{" "}
                    <span className={`font-medium ${ticket.priorityColor}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <b>Attribué :</b> {ticket.assignedTo}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    Créé le {ticket.creationDate} • Maj {ticket.lastUpdate}
                  </div>
                  <Link
                    to={`/ticket/${ticket.id}`}
                    className="px-4 py-2 rounded-lg flex items-center justify-center shadow-md transition-colors"
                    style={{ backgroundColor: "#2f6bff", color: "white" }}
                  >
                    Consulter
                  </Link>
                </div>
              ))}
            </div>
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
      {isModalOpen && (
        <CreateTicketModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTicket={handleAddTicket}
        />
      )}
    </div>
  );
};

export default HelpdeskInterface;
