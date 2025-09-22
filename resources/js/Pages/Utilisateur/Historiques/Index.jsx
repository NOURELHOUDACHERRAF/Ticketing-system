import { usePage, Link } from '@inertiajs/react';
import UtilisateurLayout from '@/Layouts/UtilisateurLayout';

export default function HistoriquesIndex() {
  const { historiques } = usePage().props;

  return (
    <UtilisateurLayout>
      <h2 className="text-xl font-semibold mb-4">Mon Historique</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Ticket</th>
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Commentaire</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {historiques.data.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center">Aucun historique</td>
              </tr>
            ) : (
              historiques.data.map((h) => (
                <tr key={h.id} className="border-t">
                  <td className="py-2 px-4">{h.ticket?.numero_ticket}</td>
                  <td className="py-2 px-4">{h.action}</td>
                  <td className="py-2 px-4">{h.commentaire || '-'}</td>
                  <td className="py-2 px-4"> {new Date(h.created_at).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
            })}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {historiques.links.map((link, i) => (
          <Link
            key={i}
            href={link.url || '#'}
            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : ''}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </UtilisateurLayout>
  );
}
