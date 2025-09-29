import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ user, units }) {
  const { data, setData, put, processing, errors } = useForm({
    nom: user.nom,
    prenom: user.prenom,
    login: user.login,
    password: "",
    email: user.email ?? "",
    telephone: user.telephone ?? "",
    Unit_org: user.Unit_org ?? "",
    actif: !!user.actif,
  });

  function submit(e) {
    e.preventDefault();
    put(route("admin.users.update", user.id_utilisateur));
  }

  return (
    <AuthenticatedLayout>
      <Head title={`Modifier l’utilisateur ${user.nom}`} />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier l’utilisateur
            </h1>
            <Link
              href={route("admin.users.index")}
              className="text-blue-600 hover:underline text-sm"
            >
              Retour
            </Link>
          </div>

          {}
          <form onSubmit={submit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Prénom
                </label>
                <input
                  value={data.prenom}
                  onChange={(e) => setData("prenom", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.prenom && (
                  <div className="text-red-600 text-sm mt-1">{errors.prenom}</div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.nom && (
                  <div className="text-red-600 text-sm mt-1">{errors.nom}</div>
                )}
              </div>

              {}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Login
                </label>
                <input
                  value={data.login}
                  onChange={(e) => setData("login", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.login && (
                  <div className="text-red-600 text-sm mt-1">{errors.login}</div>
                )}
              </div>

              {}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Mot de passe (laisser vide pour garder l’actuel)
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.password && (
                  <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.email && (
                  <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              {}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Téléphone
                </label>
                <input
                  value={data.telephone}
                  onChange={(e) => setData("telephone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.telephone && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.telephone}
                  </div>
                )}
              </div>

              {}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  Unité
                </label>
                <select
                  value={data.Unit_org}
                  onChange={(e) => setData("Unit_org", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Aucune</option>
                  {units.map((u) => (
                    <option key={u.Num} value={u.Num}>
                      {u.nom}
                    </option>
                  ))}
                </select>
                {errors.Unit_org && (
                  <div className="text-red-600 text-sm mt-1">{errors.Unit_org}</div>
                )}
              </div>

              {}
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="actif"
                  type="checkbox"
                  checked={data.actif}
                  onChange={(e) => setData("actif", e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="actif" className="text-sm text-gray-700">
                  Actif
                </label>
              </div>
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
