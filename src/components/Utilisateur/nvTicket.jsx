import React, { useState } from 'react';
import { X, ChevronDown, Upload } from 'lucide-react';

export default function CreateTicketModal({ open, onClose, onAddTicket }) {
  if (!open) return null;

  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    attachment: null
  });

  const categories = [
    'Support technique',
    'Demande d\'information',
    'Problème de connexion',
    'Autre'
  ];

  const priorities = ['Faible', 'Moyenne', 'Élevée', 'Critique'];

 const handleSubmit = () => {
  if (!formData.subject || !formData.category || !formData.priority || !formData.description) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  onClose(); 
  if (typeof onAddTicket === "function") {
    onAddTicket(formData);
  }
};


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachment: file
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        {}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Créer un nouveau ticket
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Sujet de ticket<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          {}
          <div className="grid grid-cols-2 gap-4">
            {}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Catégorie<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
                  required
                >
                  <option value="">Sélectionner</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Priorité<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
                  required
                >
                  <option value="">Sélectionner</option>
                  {priorities.map((priority, index) => (
                    <option key={index} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Description détaillée<span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                handleInputChange('description', e.target.value)
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              placeholder="Décrivez votre problème..."
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Pièce jointe
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload size={24} className="mx-auto mb-1 text-gray-400" />
                <p className="text-xs text-gray-600">
                  Cliquez pour ajouter votre pièce jointe
                </p>
                {formData.attachment && (
                  <p className="text-xs text-blue-600 mt-1">
                    {formData.attachment.name}
                  </p>
                )}
              </label>
            </div>
          </div>

          {}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm"
                style={{ backgroundColor: "#2f6bff", color: "white" }}

            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
