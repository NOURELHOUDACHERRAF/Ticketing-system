import  { useState } from "react";
import { X, ChevronDown, Calendar } from "lucide-react";

export default function FiltersModal({ onClose, onApply }) {
  const [selectedFilters, setSelectedFilters] = useState({
    agent: "Vous",
    categories: [],
    priorities: [],
    statuses: [],
    creationDate: "",
  });

  const availableOptions = {
    agents: ["Vous", "Ahmed B.", "Jhon B.", "Autre"],
    categories: ["Technique", "Support", "Maintenance", "Commercial", "Autre"],
    priorities: ["Faible", "Moyenne", "Haute", "Critique"],
    statuses: ["Ouvert", "En cours", "Traité", "Fermé", "En attente"],
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      if (prev[type].includes(value)) {
        return { ...prev, [type]: prev[type].filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...prev[type], value] };
      }
    });
  };

  const removeFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">
        {}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Filtres</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        {}
        <div className="p-3 space-y-6">
          {}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Agent
            </label>
            <div className="relative">
              <select
                value={selectedFilters.agent}
                
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    agent: e.target.value,
                  }))
                }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              >
                {availableOptions.agents.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Catégorie
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    toggleFilter("categories", e.target.value);
                    e.target.value = "";
                  }
                }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              >
                <option value="">Ajouter</option>
                {availableOptions.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFilters.categories.map((c) => (
                <span
                  key={c}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                  {c}
                  <button
                    onClick={() => removeFilter("categories", c)}
                    className="text-white text-xs leading-none w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-600 transition"
                      style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Priorité
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    toggleFilter("priorities", e.target.value);
                    e.target.value = "";
                  }
                }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              >
                <option value="">Ajouter</option>
                {availableOptions.priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFilters.priorities.map((p) => (
                <span
                  key={p}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                  {p}
                  <button
                    onClick={() => removeFilter("priorities", p)}
                    className="text-white text-xs leading-none w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-600 transition"
                    style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Statut
            </label>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    toggleFilter("statuses", e.target.value);
                    e.target.value = "";
                  }
                }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              >
                <option value="">Ajouter</option>
                {availableOptions.statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedFilters.statuses.map((s) => (
                <span
                  key={s}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                  {s}
                  <button
                    onClick={() => removeFilter("statuses", s)}
                    className="text-white text-xs leading-none w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-600 transition"
                    style={{
                  borderColor: "#0A1F77",
                  backgroundColor: "white",
                  color: "#0A1F77",
                }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Date de création
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <input
                type="date"
                value={selectedFilters.creationDate}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    creationDate: e.target.value,
                  }))
                }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
              />
            </div>
          </div>
        </div>

        {}
        <div className="p-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleApply}
            className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg"
                          style={{ backgroundColor: "#2f6bff" }}

          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
