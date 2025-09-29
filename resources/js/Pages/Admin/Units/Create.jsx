
import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    Num: "",
    nom: "",
    Abreviation: "",
  });

  function submit(e) {
    e.preventDefault();
    post(route("admin.units.store"));
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nouvelle unité" />

      <div className="p-6 max-w-3xl mx-auto">
        {}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Créer une unité</h1>
            <Link
              href={route("admin.units.index")}
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
                Num
              </label>
              <input
                type="number"
                value={data.Num}
                onChange={(e) => setData("Num", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.Num && (
                <p className="text-red-600 text-sm mt-1">{errors.Num}</p>
              )}
            </div>

            {}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Nom
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
                Abréviation
              </label>
              <input
                value={data.Abreviation}
                onChange={(e) => setData("Abreviation", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.Abreviation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.Abreviation}
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
