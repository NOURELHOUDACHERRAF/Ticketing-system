import AdminLayout from "@/Headers/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function EditAdmin({ mustVerifyEmail, status, auth }) {
    const user = auth?.user || usePage().props.auth.user;

    return (
        <AdminLayout title="Profil" auth={auth}>
            <Head title="Profile" />

            <div className="space-y-6">
                {/* User Info Card */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <div>
                            <p className="text-sm text-gray-500">Nom</p>
                            <p className="font-medium">{user?.nom}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Prénom</p>
                            <p className="font-medium">{user?.prenom}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-blue-600">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Rôle</p>
                            <p className="font-medium">{user?.role ?? "Utilisateur"}</p>
                        </div>
                    </div>
                </div>

                {/* Update Profile */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                {/* Update Password */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {/* Delete Account */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
