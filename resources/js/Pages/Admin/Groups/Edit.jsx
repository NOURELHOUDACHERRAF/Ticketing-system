import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Headers/AuthenticatedAdminLayout";

export default function Edit({ group, agents }) {
  const { data, setData, put, processing, errors } = useForm({
    nom: group.nom,
    domaine: group.domaine,
    superviseur_id: group.superviseur_id ?? "",
  });

  function submit(e) {
    e.preventDefault();
    put(route("admin.groups.update", group.id_groupe));
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Modifier Groupe ${group.nom}`} />

      <div className="p-6 max-w-3xl mx-auto">
        {}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier le groupe
            </h1>
            <Link
              href={route("admin.groups.index")}
              className="text-blue-600 hover:underline text-sm"
            >
              Retour
            </Link>
          </div>

          {}
          <form onSubmit={submit} className="p-6 space-y-6">
            {}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Nom du groupe
              </label>
              <input
                value={data.nom}
                onChange={(e) => setData("nom", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.nom && (
                <p className="text-red-600 text-sm mt-1">{errors.nom}</p>
              )}
            </div>

            {}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Domaine
              </label>
              <input
                value={data.domaine}
                onChange={(e) => setData("domaine", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.domaine && (
                <p className="text-red-600 text-sm mt-1">{errors.domaine}</p>
              )}
            </div>

            {}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Superviseur
              </label>
              <select
                value={data.superviseur_id}
                onChange={(e) => setData("superviseur_id", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="">Aucun</option>
                {agents?.map((a) => (
                  <option key={a.id_agent} value={a.id_agent}>
                    {a.nom} {a.prenom}
                  </option>
                ))}
              </select>
              {errors.superviseur_id && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.superviseur_id}
                </p>
              )}
            </div>

            {}
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