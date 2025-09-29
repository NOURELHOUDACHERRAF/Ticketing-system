import { useForm, usePage } from "@inertiajs/react";
import { X } from "lucide-react";
import React from "react";

export default function create({ open, onClose }) {
  const { categories, priorities } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
  type: "",
  description: "",
  categorie_id: "",
  priorite: "",   
  piece_jointe: null,
});

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("utilisateur.tickets.store"), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Nouveau ticket</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sujet</label>
            <input
  type="text"
  value={data.type}
  onChange={(e) => setData("type", e.target.value)}
  className="w-full px-3 py-2 border rounded-lg"
/>
{errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              value={data.categorie_id}
              onChange={(e) => setData("categorie_id", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">-- Sélectionner --</option>
              {categories.map((c) => (
                <option key={c.id_cate} value={c.id_cat}>
                  {c.Nom}
                </option>
              ))}
            </select>
            {errors.categorie_id && <p className="text-red-500 text-sm">{errors.categorie_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priorité</label>
           <select
  value={data.priorite}
  onChange={(e) => setData("priorite", e.target.value)}
  className="w-full px-3 py-2 border rounded-lg"
>
  <option value="">-- Sélectionner --</option>
  {priorities.map((p) => (
    <option key={p.value} value={p.value}>
      {p.label}
    </option>
  ))}
</select>
{errors.priorite && <p className="text-red-500 text-sm">{errors.priorite}</p>}

          
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pièce jointe</label>
            <input
              type="file"
              onChange={(e) => setData("piece_jointe", e.target.files[0])}
              className="w-full"
            />
            {errors.piece_jointe && <p className="text-red-500 text-sm">{errors.piece_jointe}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 rounded-lg bg-[#2f6bff] text-white hover:bg-blue-600"
            >
              {processing ? "Envoi..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
