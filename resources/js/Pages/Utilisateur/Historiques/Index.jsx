import { usePage } from "@inertiajs/react";
import SidebarUtilisateur from "@/SideBars/SideBarUtilisateur";
import UtilisateurHeader from "@/Headers/UtilisateurHeader";
import { X } from "lucide-react";

const HistoryDashboard = ({ setSidebarOpen }) => {
  const { historiques } = usePage().props;

  const removeHistoryItem = (id) => {
    // Ici tu appelles ton backend pour supprimer si besoin
    console.log("Suppression", id);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-poppins bg-blue-50">
      <SidebarUtilisateur sidebarOpen={false} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col bg-blue-50">
        <UtilisateurHeader setSidebarOpen={setSidebarOpen} title="Historique" />

        <div className="px-6 py-6">
          <h2 className="text-2xl font-medium text-gray-900">Historique</h2>
        </div>

        <div className="flex-1 px-6 pb-6 overflow-auto">
          <div className="space-y-0">
            {historiques.data.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-10">
                Aucun historique disponible
              </div>
            )}

            {historiques.data.map((h) => (
              <div
                key={h.id}
                className="bg-white shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-700">
                      {h.action} - {h.ticket?.numero_ticket}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(h.created_at).toLocaleString("fr-FR")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {historiques.links.map((link, i) => (
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

export default HistoryDashboard;
