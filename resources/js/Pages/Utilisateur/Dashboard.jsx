import { usePage, Link } from '@inertiajs/react';
import UtilisateurLayout from '@/Layouts/UtilisateurLayout';

export default function UtilisateurDashboard() {
    const { user, tickets, ticketStats } = usePage().props;

    return (
        <UtilisateurLayout user={user}>
            <h2 className="text-xl font-semibold mb-4">My Tickets</h2>

            {/* Ticket Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white rounded shadow">Total: {ticketStats?.total ?? 0}</div>
                <div className="p-4 bg-white rounded shadow">Nouveau: {ticketStats?.nouveau ?? 0}</div>
                <div className="p-4 bg-white rounded shadow">En cours: {ticketStats?.en_cours ?? 0}</div>
                <div className="p-4 bg-white rounded shadow">Résolu: {ticketStats?.resolu ?? 0}</div>
            </div>
            <div className="flex justify-end mb-4">
    <Link
        href={route('utilisateur.tickets.create')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
        + Créer un Ticket
    </Link>
</div>

            {/* Ticket List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">#</th>
                            <th className="py-2 px-4 text-left">Title</th>
                            <th className="py-2 px-4 text-left">Category</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Agent</th>
                            <th className="py-2 px-4 text-left">Created At</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets?.data?.map((ticket, index) => (
                            <tr key={ticket.id ?? index} className="border-t">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{ticket.titre}</td>
                                <td className="py-2 px-4">{ticket.categorie?.nom || '-'}</td>
                                <td className="py-2 px-4">{ticket.statut}</td>
                                <td className="py-2 px-4">{ticket.agent?.nom || '-'}</td>
                                <td className="py-2 px-4">{ticket.date_creation}</td>
                                <td className="py-2 px-4">
                                    {ticket.id ? (
                                        <Link
                                            href={`/utilisateur/tickets/${ticket.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-center gap-2">
                    {tickets?.links?.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </UtilisateurLayout>
    );
}
