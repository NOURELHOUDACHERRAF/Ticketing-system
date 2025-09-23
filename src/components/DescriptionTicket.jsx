import  { useState, useRef } from "react";
import { ArrowLeft, Edit3, Paperclip, Send } from "lucide-react";
import Sidebar from "./sidebar";
import { useParams, useNavigate } from "react-router-dom";

export default function SonelDeskTicket() {
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const fileInputRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleRetour = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/tickets");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAttachment(file);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSend = () => {
    if (!newMessage.trim() && !attachment) return;

    console.log("Message:", newMessage);
    if (attachment) console.log("Attachment:", attachment.name);

    setNewMessage("");
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {}
      <div className="flex-1 flex h-full">
        {}
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {}
          <div className="mb-8">
            <button
              onClick={handleRetour}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft size={18} className="mr-2" /> Retour
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Ticket n°{id}
            </h1>
          <div className="border border-gray-200 rounded-lg p-6 bg-white mb-6">

            {}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-600">
                  Sujet de ticket
                </label>
                <Edit3 size={16} className="text-blue-500 cursor-pointer" />
              </div>
              <div className="text-xl font-semibold text-gray-900">
                échec de connexion
              </div>
            </div>

            {}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-sm text-gray-600 mb-2">Priorité</div>
                <div className="font-semibold text-blue-600">Moyenne</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Status</div>
                <div className="font-semibold text-green-600">Traité</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Catégorie</div>
                <div className="font-semibold text-gray-900">Technique</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Agent assigné</div>
                <div className="font-semibold text-gray-900">Ahmed Benali</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">Créé le</div>
                <div className="font-semibold text-gray-900">10/09/2025</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Dernière modification
                </div>
                <div className="font-semibold text-gray-900">12/09/2025</div>
              </div>
            </div>
</div>
            {}
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-600 mb-3">
                Description
              </div>
              <p className="text-gray-800 leading-relaxed">
                « Impossible de me connecter à mon compte depuis hier soir. Un
                message Identifiant incorrect s'affiche. »
              </p>
            </div>

            {}
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-600 mb-3">
                Pièce jointe
              </div>
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                capture_connexion.png
              </a>
            </div>

            {}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Historique de ticket
              </h2>
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-sm text-gray-600">10/09/2025</span>
                    <span className="text-sm text-gray-900 font-medium">
                      Ticket créé par vous
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-sm text-gray-600">11/09/2025</span>
                    <span className="text-sm text-gray-900 font-medium">
                      Assigné à Ahmed Benali
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-sm text-gray-600">12/09/2025</span>
                    <span className="text-sm text-gray-900 font-medium">
                      Statut mis à jour en cours
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-6 py-4">
                    <span className="text-sm text-gray-600">12/09/2025</span>
                    <span className="text-sm text-gray-900 font-medium">
                      Statut mis à jour en traité
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
                    {}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-semibold text-gray-900">Ahmed Benali</span>
                <span className="ml-auto text-gray-500">11/09/2025</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <p className="text-gray-800">
                  Bonjour, pouvez-vous préciser le message d'erreur ?
                </p>
              </div>
            </div>

            {}
            <div className="space-y-2">
              <div className="text-sm text-gray-500 text-right">11/09/2025</div>
              <div className="flex justify-end">
                <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                  <p className="text-gray-800">Ça dit Identifiant incorrect.</p>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-semibold text-gray-900">Ahmed Benali</span>
                <span className="ml-auto text-gray-500">12/09/2025</span>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-4 shadow-sm">
                <p className="mb-4">
                  Merci. Veuillez réinitialiser votre mot de passe via ce lien :
                  reset.sonaldesk.com
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#2E7D32" }}>
                    Accepter
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#C62828" }}>
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ajouter une nouvelle chat"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={handleAttachClick}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip size={18} />
              </button>

              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                 style={{
                  borderColor: "#1976D2",
                  backgroundColor: "#1976D2",
                  color: "white",
                }}
              >
                <Send size={16}  />
              </button>
            </div>

            {attachment && (
              <div className="mt-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded border">
                Fichier joint :{" "}
                <span className="font-medium">{attachment.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
