import React, { useState } from "react";
import { X, Calendar, Check, ChevronDown } from "lucide-react";

export default function FiltreTransfere({ onClose, onApply, initialFilters }) {
  const [isOpen, setIsOpen] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    agent: initialFilters?.agent || "Vous",
    categories: initialFilters?.categories || [],
  });

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", selectedFilters);
    onApply && onApply(selectedFilters);
    setIsOpen(false);
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

  const availableOptions = {
    agents: ["Vous", "Ahmed B.", "Jhon B.", "Autre"],
   
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 shadow-2xl max-w-md w-full mx-4 rounded-xl">
        {}
        <div className="flex items-center justify-between p-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Transferer le ticket</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {}
        <div className="p-6 space-y-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
              >
                {availableOptions.agents.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          {}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-md transition-colors shadow-md"
            style={{ backgroundColor: "#4F7DF3" }}

            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
