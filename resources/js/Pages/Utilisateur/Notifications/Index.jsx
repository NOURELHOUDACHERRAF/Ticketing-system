import { usePage, router } from "@inertiajs/react";
import SidebarUtilisateur from "@/SideBars/SideBarUtilisateur";
import UtilisateurHeader from "@/Headers/UtilisateurHeader";
import { X } from "lucide-react";

const NotificationsIndex = ({ setSidebarOpen }) => {
  const { notifications } = usePage().props;


 const handleConsult = (notifId, ticketId) => {
    router.post(`/utilisateur/notifications/${notifId}/read`, {}, {
        onSuccess: () => {
            router.visit(`/utilisateur/tickets/${ticketId}`);
        },
        onError: (errors) => {
            console.error("Erreur lors de la lecture :", errors);
        }
    });
};

const removeNotification = (id_notification) => {
  router.delete(`/utilisateur/notifications/${id_notification}`, {
    preserveScroll: true,
    onSuccess: () => {
      console.log("Notification supprimée :", id_notification);
    },
    onError: (errors) => {
      console.error("Erreur suppression :", errors);
    }
  });
};


  return (
    <div className="flex h-screen w-screen overflow-hidden font-poppins bg-blue-50">
      <SidebarUtilisateur sidebarOpen={false} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col bg-blue-50">
        <UtilisateurHeader setSidebarOpen={setSidebarOpen} title="Notifications" />

        <div className="px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-900">Mes Notifications</h2>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-auto">
          <div className="space-y-0">
            {notifications.data.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-10">
                Aucune notification disponible
              </div>
            )}

            {notifications.data.map((notif) => (
              <div
                key={notif.id_notification}
                className="bg-white shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-medium">{notif.titre}</span>{" "}
                      <span className="text-sm text-gray-500">
                        ({notif.type})
                      </span>
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(notif.created_at).toLocaleString("fr-FR")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeNotification(notif.id_notification)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>

                    {/* Bouton consulter */}
                    {!notif.read_at && notif.ticket_id && (
                      <button
                  onClick={() => handleConsult(notif.id_notification, notif.ticket_id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                 style={{ backgroundColor: "#2f6bff" }}
                   >
                  Consulter
                    </button>

                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {notifications.links.map((link, i) => (
              <a
                key={i}
                href={link.url || "#"}
                className={`px-3 py-1 border rounded ${
                  link.active ? "bg-blue-600 text-white" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsIndex;
