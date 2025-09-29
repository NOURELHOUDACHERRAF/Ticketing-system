import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Headers/AuthenticatedAdminLayout";

export default function Create({ groups }) {
  const { data, setData, post, processing, errors } = useForm({
    Nom: "",
    description: "",
    id_grp: "",
  });

  function submit(e) {
    e.preventDefault();
    post(route("admin.categories.store"));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nouvelle catégorie" />

      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Créer une catégorie
            </h1>
            <Link
              href={route("admin.categories.index")}
              className="text-blue-600 hover:underline text-sm"
            >
              Retour
            </Link>
          </div>

          <form onSubmit={submit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Nom
              </label>
              <input
                value={data.Nom}
                onChange={(e) => setData("Nom", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.Nom && (
                <p className="text-red-600 text-sm mt-1">{errors.Nom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                rows="3"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Groupe
              </label>
              <select
                value={data.id_grp}
                onChange={(e) => setData("id_grp", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="">Sélectionner un groupe</option>
                {groups.map((g) => (
                  <option key={g.id_groupe} value={g.id_groupe}>
                    {g.nom}
                  </option>
                ))}
              </select>
              {errors.id_grp && (
                <p className="text-red-600 text-sm mt-1">{errors.id_grp}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                disabled={processing}
                className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg disabled:opacity-50"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}