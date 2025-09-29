<<<<<<< HEAD
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories }) {
    const { flash } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Categories" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <Link href={route('admin.categories.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New Category</Link>
                </div>
                {flash?.success && (<div className="mb-4 text-green-700">{flash.success}</div>)}
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.map(c => (
                            <tr key={c.id_cat} className="border-t">
                                <td className="py-2">{c.Nom}</td>
                                <td className="py-2">{c.description || '-'}</td>
                                <td className="py-2">{c.groupe?.nom}</td>
                                <td className="py-2 text-right">
                                    <Link href={route('admin.categories.edit', c.id_cat)} className="text-blue-600">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
=======
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Headers/AuthenticatedAdminLayout";
import { Trash2 } from "lucide-react";

export default function Index({ categories }) {
  return (
    <AuthenticatedLayout>
      <Head title="Catégories" />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Liste des catégories
          </h1>
          <Link
            href={route("admin.categories.create")}
            className="bg-[#2f6bff] hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Nouvelle Catégorie
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-semibold">Nom</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Groupe</th>
                <th className="px-14 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.data.length > 0 ? (
                categories.data.map((c) => (
                  <Row key={c.id_cat} c={c} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Aucune catégorie trouvée
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

function Row({ c }) {
  const { delete: destroy, processing } = useForm();

  function handleDelete() {
    if (confirm(`Voulez-vous vraiment supprimer la catégorie ${c.Nom} ?`)) {
      destroy(route("admin.categories.destroy", c.id_cat));
    }
  }

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition">
      <td className="px-6 py-3 font-medium text-gray-900">{c.Nom}</td>
      <td className="px-6 py-3 text-gray-700">
        {c.description || "-"}
      </td>
      <td className="px-6 py-3 text-gray-700">
        {c.groupe?.nom || "-"}
      </td>
      <td className="px-6 py-3 text-right flex items-center justify-end gap-3">
        <Link
          href={route("admin.categories.edit", c.id_cat)}
          className="text-blue-600 hover:underline font-medium"
        >
          Modifier
        </Link>
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
>>>>>>> 7a6cee6 (all changes done)
}
