import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const admin = auth.user;

    return (
        <AuthenticatedLayout auth={auth} header={<h2>Admin Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">
                                Welcome, {admin.prenom} {admin.nom}!
                            </h3>
                            <p className="mb-4">You are logged in as an Administrator.</p>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
