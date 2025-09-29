import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { router } from "@inertiajs/react";

export default function SimpleFiltersModal({ onClose, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    date: initialFilters.date || "",
    readStatus: {
      read: initialFilters.readStatus?.read || false,
      unread: initialFilters.readStatus?.unread || false,
    },
  });

  const handleClose = () => {
    onClose && onClose();
  };

  const handleApplyFilters = () => {
    // Envoie des filtres au backend
    router.get(route("notifications.index"), filters, { preserveState: true });
    handleClose();
  };

  const handleReadStatusChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      readStatus: {
        ...prev.readStatus,
        [type]: !prev.readStatus[type],
      },
    }));
  };

  const handleDateChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 shadow-2xl max-w-ms w-100 mx-4 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Filtres</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-8">
          {/* Date */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={filters.date}
                onChange={handleDateChange}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 text-base bg-gray-50"
              />
            </div>
          </div>

          {/* Read / Unread */}
          <div className="w-full px-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-2xl space-y-4">
            <div
              className="flex items-center cursor-pointer py-2"
              onClick={() => handleReadStatusChange("read")}
            >
              <div
                className={`w-6 h-6 border-2 rounded-md mr-4 flex items-center justify-center transition-all ${
                  filters.readStatus.read
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-blue-500"
                }`}
              >
                {filters.readStatus.read && (
                  <Check size={16} className="text-white stroke-2" />
                )}
              </div>
              <span className="text-lg text-gray-900">Lus</span>
            </div>

            <div
              className="flex items-center cursor-pointer py-2"
              onClick={() => handleReadStatusChange("unread")}
            >
              <div
                className={`w-6 h-6 border-2 rounded-md mr-4 flex items-center justify-center transition-all ${
                  filters.readStatus.unread
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-blue-500"
                }`}
              >
                {filters.readStatus.unread && (
                  <Check size={16} className="text-white stroke-2" />
                )}
              </div>
              <span className="text-lg text-gray-900">Non lus</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg"
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
