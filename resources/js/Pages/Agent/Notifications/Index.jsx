import { usePage, Link } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';

export default function NotificationsIndex() {
  const { notifications } = usePage().props;

  return (
    <AgentLayout>
      <h2 className="text-xl font-semibold mb-4">Mes Notifications</h2>

      <div className="bg-white rounded shadow p-4">
        {notifications.data.length === 0 ? (
          <p>Aucune notification</p>
        ) : (
          <ul className="divide-y">
            {notifications.data.map((notif) => (
              <li key={notif.id} className="py-2">
                <span className="font-medium">{notif.titre}</span>
                <span className="block text-sm text-gray-500">{notif.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {notifications.links.map((link, i) => (
          <Link
            key={i}
            href={link.url || '#'}
            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : ''}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </AgentLayout>
  );
}
