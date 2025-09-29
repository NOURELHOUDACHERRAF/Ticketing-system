import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Trash2 } from "lucide-react";

export default function Index({ users, units }) {
  return (
    <AuthenticatedLayout>
      <Head title="Utilisateurs" />

      <div className="p-6 max-w-6xl mx-auto">
        {}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Liste des utilisateurs</h1>
          <Link
            href={route("admin.users.create")}
            className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Nouvel utilisateur
          </Link>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-semibold">Nom complet</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Unité</th>
                <th className="px-14 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.data.length > 0 ? (
                users.data.map((u) => (
                  <Row key={u.id_utilisateur} u={u} units={units} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
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

function Row({ u, units }) {
  const { data, setData, post, processing } = useForm({
    Unit_org: u.Unit_org || "",
  });

  const { delete: destroy, processing: deleting } = useForm();

  function submit(e) {
    e.preventDefault();
    post(route("admin.users.assignUnit", u.id_utilisateur));
  }

  function handleDelete() {
    if (confirm(`Voulez-vous vraiment supprimer ${u.nom} ${u.prenom} ?`)) {
      destroy(route("admin.users.destroy", u.id_utilisateur));
    }
  }

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-3 font-medium text-gray-900">
        {u.nom} {u.prenom}
      </td>
      <td className="px-6 py-3 text-gray-700">{u.email ?? "-"}</td>
      <td className="px-6 py-3">
        <form onSubmit={submit} className="flex items-center gap-2">
          <select
            value={data.Unit_org}
            onChange={(e) => setData("Unit_org", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Aucune</option>
            {units.map((unit) => (
              <option key={unit.Num} value={unit.Num}>
                {unit.nom}
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
        {}
        <Link
          href={route("admin.users.edit", u.id_utilisateur)}
          className="text-blue-600 hover:underline font-medium"
        >
          Modifier
        </Link>

        {}
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
