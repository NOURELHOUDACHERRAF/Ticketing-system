<<<<<<< HEAD
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ category, groups }) {
    const { data, setData, put, processing, errors } = useForm({
        Nom: category.Nom,
        description: category.description ?? '',
        id_grp: category.id_grp,
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.categories.update', category.id_cat));
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Category ${category.Nom}`} />
            <div className="p-6 max-w-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Edit Category</h1>
                    <Link href={route('admin.categories.index')} className="text-blue-600">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input value={data.Nom} onChange={e => setData('Nom', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.Nom && <div className="text-red-600 text-sm mt-1">{errors.Nom}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border rounded px-3 py-2" rows="3" />
                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Group</label>
                        <select value={data.id_grp} onChange={e => setData('id_grp', e.target.value)} className="w-full border rounded px-3 py-2">
                            {groups.map(g => (
                                <option key={g.id_groupe} value={g.id_groupe}>{g.nom}</option>
                            ))}
                        </select>
                        {errors.id_grp && <div className="text-red-600 text-sm mt-1">{errors.id_grp}</div>}
                    </div>
                    <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
=======
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Headers/AuthenticatedAdminLayout";

export default function Edit({ category, groups }) {
  const { data, setData, put, processing, errors } = useForm({
    Nom: category.Nom,
    description: category.description ?? "",
    id_grp: category.id_grp,
  });

  function submit(e) {
    e.preventDefault();
    put(route("admin.categories.update", category.id_cat));
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Modifier Catégorie ${category.Nom}`} />

      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier la catégorie
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
>>>>>>> 7a6cee6 (all changes done)
}
