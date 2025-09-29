import { useState } from "react";
import SidebarUtilisateur from "@/SideBars/SideBarUtilisateur";
import UtilisateurHeader from "@/Headers/UtilisateurHeader";
import { usePage } from "@inertiajs/react";
import { Edit } from "lucide-react";

import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Show() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = usePage().props.auth.user;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden font-poppins bg-blue-50">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SidebarUtilisateur sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <UtilisateurHeader setSidebarOpen={setSidebarOpen} title="Profil" />

        {/* Section Profil */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <section className="relative bg-white rounded-lg shadow-md max-w-3xl w-full p-6 sm:p-8">
            {/* Bouton Modifier */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="bg-blue-100 text-blue-600 p-2 rounded-full shadow hover:bg-blue-200"
              >
                <Edit size={18} className="text-blue-500" />
              </button>
              <button
                onClick={() => setIsPasswordOpen(true)}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded shadow hover:bg-gray-200 text-sm"
              >
                Mot de passe
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={`https://ui-avatars.com/api/?name=${user.nom}+${user.prenom}&background=2f6bff&color=fff`}
                alt="avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100"
              />
              <h2 className="mt-4 text-xl font-semibold">
                {user.nom} {user.prenom}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* Infos utilisateur */}
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 mb-8">
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-semibold">{user.telephone ?? "Non renseigné"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unité</p>
                <p className="font-semibold">{user.unite_organisationnelle?.Nom ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date activation</p>
                <p className="font-semibold">
                  {user.date_activation ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date expiration</p>
                <p className="font-semibold">
                  {user.date_expiration ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <p className={`font-semibold ${user.actif ? "text-green-600" : "text-red-600"}`}>
                  {user.actif ? "Actif" : "Inactif"}
                </p>
              </div>
            </div>

            {/* Suppression compte */}
            <div className="mt-8">
              <DeleteUserForm />
            </div>
          </section>
        </div>
      </main>

      {/* Modal Update Profil */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Modifier mes informations</h2>
            <UpdateProfileInformationForm
              mustVerifyEmail={true}
              status={null}
              className="max-w-lg"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update Password */}
      {isPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Changer le mot de passe</h2>
            <UpdatePasswordForm className="max-w-lg" />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsPasswordOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
