import React, { useState } from "react";
import { X } from "lucide-react";
import { router } from "@inertiajs/react";

export default function SortModal({ onClose, onApply }) {
  const [selectedSort, setSelectedSort] = useState("creation");
  const [sortOrder, setSortOrder] = useState("desc"); // desc = plus récent d'abord, asc = plus ancien d'abord

  const handleApplySort = () => {
    const sortData = {
      sort: selectedSort,
      order: sortOrder
    };

    if (onApply) {
      // Utilise la fonction onApply passée depuis le Dashboard
      onApply(sortData);
    } else {
      // Fallback - essaie de naviguer vers la route utilisateur
      try {
        router.get(route("utilisateur.dashboard"), sortData, { preserveState: true });
      } catch (error) {
        // Si la route n'existe pas, recharge la page avec les paramètres de tri
        router.get(window.location.pathname, sortData, { preserveState: true });
      }
    }
    onClose();
  };

  const sortOptions = [
    { value: "creation", label: "Date de création", desc: "Plus récents d'abord" },
    { value: "lastUpdate", label: "Dernière mise à jour", desc: "Mis à jour récemment" },
    { value: "priority", label: "Priorité", desc: "Priorité haute d'abord" },
    { value: "status", label: "Statut", desc: "Par ordre de statut" },
    { value: "subject", label: "Sujet", desc: "Par ordre alphabétique" }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Trier par</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Options de tri */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Critère de tri</h3>
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-start gap-4 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedSort(option.value)}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    selectedSort === option.value ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
                  }`}
                >
                  {selectedSort === option.value && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 block">
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {option.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ordre de tri */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Ordre</h3>
            {[
              { value: "desc", label: "Décroissant", desc: "Plus récent → plus ancien" },
              { value: "asc", label: "Croissant", desc: "Plus ancien → plus récent" }
            ].map((order) => (
              <div
                key={order.value}
                className="flex items-start gap-4 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setSortOrder(order.value)}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    sortOrder === order.value ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
                  }`}
                >
                  {sortOrder === order.value && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900 block">
                    {order.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {order.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <button 
            onClick={() => {
              setSelectedSort("creation");
              setSortOrder("desc");
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Réinitialiser
          </button>
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleApplySort}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}