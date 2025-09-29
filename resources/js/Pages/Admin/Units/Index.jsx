import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Headers/AuthenticatedAdminLayout";
import { Trash2 } from "lucide-react";

export default function Index({ units }) {
  const { flash } = usePage().props;

  return (
    <AuthenticatedLayout>
      <Head title="Units" />

      <div className="p-6 max-w-6xl mx-auto">
        {}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Liste des unités</h1>
          <Link
            href={route("admin.units.create")}
            className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Nouvelle Unité
          </Link>
        </div>

        {}
        {flash?.success && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-100 text-green-800 text-sm font-medium shadow">
            {flash.success}
          </div>
        )}

        {}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-semibold">Numéro</th>
                <th className="px-6 py-3 font-semibold">Nom</th>
                <th className="px-6 py-3 font-semibold">Abréviation</th>
                <th className="px-14 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.data.length > 0 ? (
                units.data.map((u) => <Row key={u.Num} u={u} />)
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucune unité trouvée
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

function Row({ u }) {
  const { delete: destroy, processing } = useForm();

  function handleDelete() {
    if (confirm(`Voulez-vous vraiment supprimer l'unité "${u.nom}" ?`)) {
      destroy(route("admin.units.destroy", u.Num));
    }
  }

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-3 font-medium text-gray-900">{u.Num}</td>
      <td className="px-6 py-3 text-gray-700">{u.nom}</td>
      <td className="px-6 py-3 text-gray-700">{u.Abreviation ?? "-"}</td>
      <td className="px-6 py-3 text-right flex items-center justify-end gap-3">
        {}
        <Link
          href={route("admin.units.edit", u.Num)}
          className="text-blue-600 hover:underline font-medium"
        >
          Modifier
        </Link>

        {}
        <button
          onClick={handleDelete}
          disabled={processing}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
          title="Supprimer"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}