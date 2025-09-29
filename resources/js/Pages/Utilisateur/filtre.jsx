import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { router } from "@inertiajs/react";

export default function FiltersModal({ onClose, onApply, appliedFilters = {}, filterOptions = {} }) {
  const [filters, setFilters] = useState({
    agent: "",
    categories: [],
    priorities: [],
    statuses: [],
    creationDate: "",
  });

  // Initialiser avec les filtres déjà appliqués - CORRIGÉ
  useEffect(() => {
    setFilters({
      agent: appliedFilters.agent || "",
      categories: Array.isArray(appliedFilters.categories) ? appliedFilters.categories : [],
      priorities: Array.isArray(appliedFilters.priorities) ? appliedFilters.priorities : [],
      statuses: Array.isArray(appliedFilters.statuses) ? appliedFilters.statuses : [],
      creationDate: appliedFilters.creationDate || "",
    });
  }, [appliedFilters]);

  // Valeurs par défaut si filterOptions est undefined ou incomplet
  const {
    agents = [],
    categories = [],
    priorities = [],
    statuses = []
  } = filterOptions;

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      // S'assurer que prev[type] est toujours un array
      const currentArray = Array.isArray(prev[type]) ? prev[type] : [];
      
      if (currentArray.includes(value)) {
        return { ...prev, [type]: currentArray.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...currentArray, value] };
      }
    });
  };

  const handleApply = () => {
    // Nettoyer les filtres vides
    const cleanedFilters = {};
    
    if (filters.agent && filters.agent.trim() !== "") {
      cleanedFilters.agent = filters.agent;
    }
    
    if (Array.isArray(filters.categories) && filters.categories.length > 0) {
      cleanedFilters.categories = filters.categories;
    }
    
    if (Array.isArray(filters.priorities) && filters.priorities.length > 0) {
      cleanedFilters.priorities = filters.priorities;
    }
    
    if (Array.isArray(filters.statuses) && filters.statuses.length > 0) {
      cleanedFilters.statuses = filters.statuses;
    }
    
    if (filters.creationDate && filters.creationDate.trim() !== "") {
      cleanedFilters.creationDate = filters.creationDate;
    }

    if (onApply) {
      onApply(cleanedFilters);
    } else {
      // Fallback si onApply n'est pas défini
      try {
        router.get(route("utilisateur.tickets.index"), cleanedFilters, { preserveState: true });
      } catch (error) {
        router.get(window.location.pathname, cleanedFilters, { preserveState: true });
      }
      onClose();
    }
  };

  const clearFilters = () => {
    const emptyFilters = {
      agent: "",
      categories: [],
      priorities: [],
      statuses: [],
      creationDate: "",
    };
    setFilters(emptyFilters);
  };

  // Compteur de filtres actifs - CORRIGÉ
  const activeFiltersCount = 
    (filters.agent ? 1 : 0) +
    (Array.isArray(filters.categories) ? filters.categories.length : 0) +
    (Array.isArray(filters.priorities) ? filters.priorities.length : 0) +
    (Array.isArray(filters.statuses) ? filters.statuses.length : 0) +
    (filters.creationDate ? 1 : 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Agent */}
          {agents.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">Agent</label>
              <select
                value={filters.agent || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, agent: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les agents</option>
                {agents.map((agent, index) => (
                  <option key={index} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Catégories
                {Array.isArray(filters.categories) && filters.categories.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {filters.categories.length}
                  </span>
                )}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories.map((cat, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Array.isArray(filters.categories) && filters.categories.includes(cat)}
                      onChange={() => toggleFilter("categories", cat)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Priorités */}
          {priorities.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Priorités
                {Array.isArray(filters.priorities) && filters.priorities.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {filters.priorities.length}
                  </span>
                )}
              </label>
              <div className="space-y-2">
                {priorities.map((prio, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Array.isArray(filters.priorities) && filters.priorities.includes(prio)}
                      onChange={() => toggleFilter("priorities", prio)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{prio}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Statuts */}
          {statuses.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Statuts
                {Array.isArray(filters.statuses) && filters.statuses.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {filters.statuses.length}
                  </span>
                )}
              </label>
              <div className="space-y-2">
                {statuses.map((status, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Array.isArray(filters.statuses) && filters.statuses.includes(status)}
                      onChange={() => toggleFilter("statuses", status)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Date de création
              {filters.creationDate && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  Filtrée
                </span>
              )}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.creationDate || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, creationDate: e.target.value }))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {filters.creationDate && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, creationDate: "" }))}
                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
              >
                Effacer la date
              </button>
            )}
          </div>

          {/* Message si aucune option de filtre */}
          {agents.length === 0 && categories.length === 0 && priorities.length === 0 && statuses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune option de filtre disponible</p>
              <p className="text-sm">Les filtres se baseront sur vos tickets existants</p>
            </div>
          )}

          {/* Aperçu des filtres actifs */}
          {activeFiltersCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Filtres actifs :</h4>
              <div className="space-y-1 text-sm text-blue-700">
                {filters.agent && <div>• Agent : {filters.agent}</div>}
                {Array.isArray(filters.categories) && filters.categories.length > 0 && <div>• Catégories : {filters.categories.join(", ")}</div>}
                {Array.isArray(filters.priorities) && filters.priorities.length > 0 && <div>• Priorités : {filters.priorities.join(", ")}</div>}
                {Array.isArray(filters.statuses) && filters.statuses.length > 0 && <div>• Statuts : {filters.statuses.join(", ")}</div>}
                {filters.creationDate && <div>• Date de création : {new Date(filters.creationDate).toLocaleDateString('fr-FR')}</div>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between bg-gray-50 sticky bottom-0">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={activeFiltersCount === 0}
          >
            Réinitialiser
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              Appliquer
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}