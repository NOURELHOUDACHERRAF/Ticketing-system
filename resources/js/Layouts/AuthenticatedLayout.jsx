import { usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function AuthenticatedLayout({ auth, header, children }) {
    const user = auth?.user ?? usePage().props.auth?.user;

    if (!user) return <div>Loading...</div>;

    // Determine if the logged-in user is an admin
    const isAdmin = user?.guard === 'admin' || user?.email?.includes('@'); // simple check

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 p-4 flex gap-4">
                <Link href={route('dashboard')} className="text-blue-600 hover:underline">
                    Dashboard
                </Link>

                {isAdmin && (
                    <>
                        <Link href={route('admin.users.index')} className="text-blue-600 hover:underline">
                            Users
                        </Link>
                        <Link href={route('admin.agents.index')} className="text-blue-600 hover:underline">
                            Agents
                        </Link>
                        <Link href={route('admin.groups.index')} className="text-blue-600 hover:underline">
                            Groups
                        </Link>
                        <Link href={route('admin.units.index')} className="text-blue-600 hover:underline">
                            Units
                        </Link>
                    </>
                )}

                {/* Log out link */}
                <Link
                    href={isAdmin ? route('admin.logout') : route('utilisateur.logout')}
                    method="post"
                    as="button"
                    className="text-red-600 hover:underline ml-auto"
                >
                    Log Out
                </Link>
            </nav>

            {/* Optional header */}
            {header && <header className="bg-white shadow p-4">{header}</header>}

            {/* Main content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
