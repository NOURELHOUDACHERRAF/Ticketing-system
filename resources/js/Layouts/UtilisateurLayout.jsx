import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function UtilisateurLayout({ user, children }) {
    const currentUser = user ?? usePage().props.user;

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow flex justify-between items-center p-4">
                <div className="text-xl font-bold text-blue-600">
                    Ticketing System
                </div>

                <div>
                    <Link
                        href={route('utilisateur.logout')}
                        method="post"
                        as="button"
                        className="text-red-600 hover:underline"
                    >
                        Logout
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
