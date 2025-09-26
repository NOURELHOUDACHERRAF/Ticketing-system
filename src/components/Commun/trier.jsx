import React, { useState } from "react";
import { X } from "lucide-react";

export default function SortModal({ onApply, onClose }) {
  const [selectedSort, setSelectedSort] = useState("creation");

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
  };

  const handleApplySort = () => {
    if (onApply) {
      onApply(selectedSort);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        {}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Trier</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        {}
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-6">
            {}
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => handleSortChange("creation")}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedSort === "creation"
                    ? "border-blue-600 bg-blue-600"
                    : "border-blue-600 bg-white"
                }`}
              >
                {selectedSort === "creation" && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-base text-gray-900 font-medium">
                Date de création
              </span>
            </div>

            {}
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => handleSortChange("lastUpdate")}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedSort === "lastUpdate"
                    ? "border-blue-600 bg-blue-600"
                    : "border-blue-600 bg-white"
                }`}
              >
                {selectedSort === "lastUpdate" && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-base text-gray-900 font-medium">
                Dernière mise à jour
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={handleApplySort}
            className="px-5 py-2 rounded-lg bg-[#2f6bff] text-white hover:bg-blue-700"
                                      style={{ backgroundColor: "#2f6bff" }}

          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}
