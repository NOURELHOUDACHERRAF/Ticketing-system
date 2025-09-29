import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Trash2 } from "lucide-react";

export default function Index({ groups, agents }) {
  return (
    <AuthenticatedLayout>
      <Head title="Groupes" />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Liste des groupes</h1>
          <Link
            href={route("admin.groups.create")}
            className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Nouveau Groupe
          </Link>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-semibold">Nom</th>
                <th className="px-6 py-3 font-semibold">Domaine</th>
                <th className="px-6 py-3 font-semibold">Superviseur</th>
                <th className="px-14 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.data.length > 0 ? (
                groups.data.map((g) => (
                  <Row key={g.id_groupe} g={g} agents={agents} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucun groupe trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function Row({ g, agents }) {
  const { data, setData, post, processing } = useForm({
    superviseur_id: g.superviseur_id || "",
  });

  const { delete: destroy, processing: deleting } = useForm();

  function submit(e) {
    e.preventDefault();
    post(route("admin.groups.setSupervisor", g.id_groupe));
  }

  function handleDelete() {
    if (confirm(`Voulez-vous vraiment supprimer le groupe ${g.nom} ?`)) {
      destroy(route("admin.groups.destroy", g.id_groupe));
    }
  }

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-3 font-medium text-gray-900">{g.nom}</td>
      <td className="px-6 py-3 text-gray-700">{g.domaine}</td>
      <td className="px-6 py-3">
        <form onSubmit={submit} className="flex items-center gap-2">
          <select
            value={data.superviseur_id}
            onChange={(e) => setData("superviseur_id", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm min-w-0 flex-shrink"
          >
            <option value="">Aucun</option>
            {agents.map((a) => (
              <option key={a.id_agent} value={a.id_agent}>
                {a.nom} {a.prenom}
              </option>
            ))}
          </select>
          <button
            disabled={processing}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-lg disabled:opacity-50"
          >
            Sauvegarder
          </button>
        </form>
      </td>
      <td className="px-6 py-3 text-right flex items-center justify-end gap-3">
        {/* Edit button */}
        <Link
          href={route("admin.groups.edit", g.id_groupe)}
          className="text-blue-600 hover:underline font-medium"
        >
          Modifier
        </Link>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          title="Supprimer"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}