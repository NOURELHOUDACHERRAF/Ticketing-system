import { usePage, Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  List,
  Bell,
  Calendar,
  User
} from "lucide-react";
import FiltersModal from "./filtre";
import SortModal from "./trier";
import SidebarUtilisateur from "@/SideBars/SideBarUtilisateur";
import Create from "./Tickets/Create";
import UtilisateurHeader from "@/Headers/UtilisateurHeader";

export default function Dashboard() {
  const { user, tickets, ticketStats, notifications } = usePage().props;

  console.log('Dashboard data:', { user, tickets, ticketStats }); // Debug

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  // Les tickets viennent directement de Laravel/Inertia
  const allTickets = tickets?.data || tickets || [];
  
  console.log('All tickets:', allTickets); // Debug

  // Application des filtres
  const applyFilters = (ticketsToFilter, filters = {}) => {
    let filtered = [...ticketsToFilter];

    // Filtre par agent
    if (filters.agent && filters.agent !== "") {
      filtered = filtered.filter(ticket => {
        const agentName = ticket.agent || "";
        return agentName.toLowerCase().includes(filters.agent.toLowerCase());
      });
    }

    // Filtre par catégories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(ticket => {
        const categoryName = ticket.categorie?.nom || ticket.categorie || "";
        return filters.categories.includes(categoryName);
      });
    }

    // Filtre par priorités
    if (filters.priorities && filters.priorities.length > 0) {
      filtered = filtered.filter(ticket => {
        return filters.priorities.includes(ticket.priorite);
      });
    }

    // Filtre par statuts
    if (filters.statuses && filters.statuses.length > 0) {
      filtered = filtered.filter(ticket => {
        return filters.statuses.includes(ticket.statut);
      });
    }

    // Filtre par date de création
    if (filters.creationDate && filters.creationDate !== "") {
      filtered = filtered.filter(ticket => {
        const ticketDate = new Date(ticket.date_creation).toISOString().split('T')[0];
        return ticketDate === filters.creationDate;
      });
    }

    return filtered;
  };

  // Application de la recherche textuelle
  const applySearch = (ticketsToFilter, query) => {
    if (!query.trim()) {
      return ticketsToFilter;
    }

    const searchTerm = query.toLowerCase().trim();
    return ticketsToFilter.filter(ticket => {
      return (
        // ID et numéro de ticket
        ticket.id_ticket?.toString().toLowerCase().includes(searchTerm) ||
        ticket.numero_ticket?.toString().toLowerCase().includes(searchTerm) ||
        
        // Type
        ticket.type?.toLowerCase().includes(searchTerm) ||
        
        // Statut
        ticket.statut?.toLowerCase().includes(searchTerm) ||
        
        // Priorité
        ticket.priorite?.toLowerCase().includes(searchTerm) ||
        
        // Agent
        ticket.agent?.toLowerCase().includes(searchTerm) ||
        
        // Catégorie (accès à l'attribut nom)
        ticket.categorie?.nom?.toLowerCase().includes(searchTerm) ||
        (typeof ticket.categorie === 'string' && ticket.categorie.toLowerCase().includes(searchTerm))
      );
    });
  };

  // Effect pour appliquer recherche et filtres
  useEffect(() => {
    let result = allTickets;
    
    // Appliquer d'abord les filtres
    if (Object.keys(appliedFilters).length > 0) {
      result = applyFilters(result, appliedFilters);
    }
    
    // Puis appliquer la recherche
    result = applySearch(result, searchQuery);
    
    setFilteredTickets(result);
  }, [searchQuery, appliedFilters, allTickets]);

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (statut) => {
    switch(statut?.toUpperCase()) {
      case 'URGENT': return 'text-red-600 bg-red-50';
      case 'EN_COURS': case 'EN COURS': return 'text-blue-600 bg-blue-50';
      case 'TRAITÉ': case 'TRAITE': return 'text-green-600 bg-green-50';
      case 'RESOLU': case 'RÉSOLU': return 'text-green-600 bg-green-50';
      case 'CLOS': return 'text-gray-600 bg-gray-50';
      case 'NOUVEAU': return 'text-orange-600 bg-orange-50';
      case 'EN ATTENTE': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Fonction pour obtenir la couleur de priorité
  const getPriorityColor = (priorite) => {
    switch(priorite?.toUpperCase()) {
      case 'HAUTE': case 'URGENT': return 'text-red-600 bg-red-50';
      case 'MOYENNE': case 'NORMAL': case 'NORMALE': return 'text-blue-600 bg-blue-50';
      case 'BASSE': case 'FAIBLE': return 'text-green-600 bg-green-50';
      case 'CRITIQUE': return 'text-red-700 bg-red-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Fonction pour gérer l'application des filtres
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  // Fonction pour effacer tous les filtres
  const clearAllFilters = () => {
    setAppliedFilters({});
    setSearchQuery("");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-white">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SidebarUtilisateur sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <UtilisateurHeader 
         setSidebarOpen={setSidebarOpen} 
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
        />
        
        <div className="flex-1 p-6 overflow-auto">
          {/* Affichage du terme de recherche et filtres actifs */}
          {(searchQuery || Object.keys(appliedFilters).length > 0) && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-700">
                  {searchQuery && (
                    <span>Recherche : "<strong>{searchQuery}</strong>"</span>
                  )}
                  {searchQuery && Object.keys(appliedFilters).length > 0 && <span> • </span>}
                  {Object.keys(appliedFilters).length > 0 && (
                    <span>Filtres actifs</span>
                  )}
                  <span className="ml-2">- {filteredTickets.length} résultat(s)</span>
                </div>
                <button 
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Tout effacer
                </button>
              </div>
            </div>
          )}

          {/* Boutons haut */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            {/* Nouveau ticket */}
            <button
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              nouveau ticket
            </button>

            {/* Filtrer & Trier */}
            <div className="flex space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg flex items-center justify-center transition-colors shadow-sm ${
                  Object.keys(appliedFilters).length > 0 
                    ? "bg-blue-100 text-blue-700 border-blue-300" 
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                filtre
                {Object.keys(appliedFilters).length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                    {Object.keys(appliedFilters).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsSortModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center justify-center transition-colors shadow-sm hover:bg-gray-50"
              >
                <List className="w-4 h-4 mr-2" />
                trier
              </button>
            </div>
          </div>

          {/* Stats - Corrigées pour utiliser les vraies données */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Total</div>
              <div className="text-2xl font-semibold text-gray-900">
                {(searchQuery || Object.keys(appliedFilters).length > 0) ? filteredTickets.length : ticketStats?.total || allTickets.length}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Nouveau</div>
              <div className="text-2xl font-semibold text-orange-600">
                {(searchQuery || Object.keys(appliedFilters).length > 0)
                  ? filteredTickets.filter(t => t.statut === 'NOUVEAU').length
                  : ticketStats?.nouveau || 0
                }
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">En cours</div>
              <div className="text-2xl font-semibold text-blue-600">
                {(searchQuery || Object.keys(appliedFilters).length > 0)
                  ? filteredTickets.filter(t => t.statut === 'EN_COURS').length
                  : ticketStats?.en_cours || 0
                }
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">Résolu</div>
              <div className="text-2xl font-semibold text-green-600">
                {(searchQuery || Object.keys(appliedFilters).length > 0)
                  ? filteredTickets.filter(t => t.statut === 'RESOLU').length
                  : ticketStats?.resolu || 0
                }
              </div>
            </div>
          </div>

          {/* Table Tickets - CORRIGÉE */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">N° Ticket</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Sujet</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Catégorie</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Statut</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Priorité</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Agent</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Créé</th>
                    <th className="px-3 py-3 text-center text-xs font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id_ticket} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3 text-xs font-medium text-gray-900">
                          #{ticket.numero_ticket || ticket.id_ticket}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-700">
                          <div className="max-w-[80px] truncate" title={ticket.type}>
                            {ticket.type || "-"}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-700">
                          <div className="max-w-[80px] truncate" title={ticket.categorie?.nom || ticket.categorie}>
                            {ticket.categorie?.nom || ticket.categorie || "-"}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(ticket.statut)}`}>
                            {ticket.statut || "-"}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getPriorityColor(ticket.priorite)}`}>
                            {ticket.priorite || "NORMAL"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-700">
                          <div className="max-w-[80px] truncate" title={ticket.agent}>
                            {ticket.agent || "Non assigné"}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500">
                          {ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                          }) : "-"}
                        </td>

                        <td className="px-3 py-3 text-center">
                          <Link
                            href={`/utilisateur/tickets/${ticket.id_ticket}`}
                            className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Voir
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-12 text-center">
                        <div className="text-gray-500">
                          {(searchQuery || Object.keys(appliedFilters).length > 0) ? (
                            <div>
                              <p className="mb-2">Aucun ticket trouvé avec les critères actuels</p>
                              <button 
                                onClick={clearAllFilters}
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                Effacer tous les filtres
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p className="mb-2">Aucun ticket disponible</p>
                              <button 
                                onClick={() => setIsModalOpen(true)}
                                className="text-blue-600 hover:text-blue-700 underline"
                              >
                                Créer votre premier ticket
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards - CORRIGÉES */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id_ticket} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-semibold text-gray-900">
                        #{ticket.numero_ticket || ticket.id_ticket}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.statut)}`}>
                        {ticket.statut}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="text-gray-700">
                        <span className="font-medium text-gray-900">Type :</span> {ticket.type || "-"}
                      </div>
                      <div className="text-gray-700">
                        <span className="font-medium text-gray-900">Catégorie :</span> {ticket.categorie?.nom || ticket.categorie || "-"}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-gray-700">
                          <span className="font-medium text-gray-900">Priorité :</span> 
                          <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priorite)}`}>
                            {ticket.priorite || "NORMAL"}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-700">
                        <span className="font-medium text-gray-900">Agent :</span> {ticket.agent || "Non assigné"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        <div>Créé le {ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) : "-"}</div>
                        {ticket.date_modification && (
                          <div>Modifié le {new Date(ticket.date_modification).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Link
                        href={`/utilisateur/tickets/${ticket.id_ticket}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Consulter
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  {(searchQuery || Object.keys(appliedFilters).length > 0) ? (
                    <div>
                      <p className="mb-2">Aucun ticket trouvé avec les critères actuels</p>
                      <button 
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Effacer tous les filtres
                      </button>
                    </div>
                  ) : (
                    "Aucun ticket disponible"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pagination - seulement si pas de filtres actifs */}
          {tickets?.links && !searchQuery && Object.keys(appliedFilters).length === 0 && (
            <div className="mt-6 flex justify-center gap-2">
              {tickets.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url || "#"}
                  className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                    link.active 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isFilterOpen && (
        <FiltersModal 
          onClose={() => setIsFilterOpen(false)} 
          onApply={handleApplyFilters}
          appliedFilters={appliedFilters}
          filterOptions={{
            agents: [...new Set(allTickets.map(t => t.agent).filter(Boolean))],
            categories: [...new Set(allTickets.map(t => t.categorie?.nom|| t.categorie).filter(Boolean))],
            priorities: [...new Set(allTickets.map(t => t.priorite).filter(Boolean))],
            statuses: [...new Set(allTickets.map(t => t.statut).filter(Boolean))]
          }}
        />
      )}
      
      {isSortModalOpen && (
        <SortModal 
          onClose={() => setIsSortModalOpen(false)} 
          onApply={(sortData) => {
            const sortedTickets = [...filteredTickets].sort((a, b) => {
              let valueA, valueB;
              
              switch(sortData.sort) {
                case 'creation':
                  valueA = new Date(a.date_creation || 0);
                  valueB = new Date(b.date_creation || 0);
                  break;
                case 'modification':
                  valueA = new Date(a.date_modification || 0);
                  valueB = new Date(b.date_modification || 0);
                  break;
                case 'priority':
                  const priorityOrder = { 'CRITIQUE': 4, 'HAUTE': 3, 'MOYENNE': 2, 'NORMALE': 2, 'BASSE': 1 };
                  valueA = priorityOrder[a.priorite] || 0;
                  valueB = priorityOrder[b.priorite] || 0;
                  break;
                case 'status':
                  valueA = a.statut || '';
                  valueB = b.statut || '';
                  break;
                default:
                  valueA = a.id_ticket;
                  valueB = b.id_ticket;
              }
              
              return sortData.order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
            });
            
            setFilteredTickets(sortedTickets);
            setIsSortModalOpen(false);
          }}
        />
      )}
      
      {isModalOpen && (
        <Create
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}