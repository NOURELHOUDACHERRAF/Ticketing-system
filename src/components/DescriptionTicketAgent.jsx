import  { useState, useRef } from "react";
import { ArrowLeft, Edit3, Paperclip, Send } from "lucide-react";
import Sidebar from "./sidebar";
import { useParams, useNavigate } from "react-router-dom";

export default function DescriptionTicket() {
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
          <button
            onClick={handleRetour}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={18} className="mr-2" /> Retour
          </button>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Ticket n°{id}
            </h1>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            style={{ backgroundColor: "#4F7DF3" }}>
              Demande d’aide
            </button>
          </div>

          {}
          <div className="border border-gray-200 rounded-lg p-6 bg-white mb-6">
            {}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  échec de connexion
                </h2>
              </div>
              <Edit3 size={16} className="text-blue-500 cursor-pointer" />
            </div>

            {}
            <div className="grid grid-cols-3 gap-6 mb-6 text-sm">
              <div>
                <span className="text-gray-600 block">Priorité</span>
                <span className="font-semibold text-blue-600">Moyenne</span>
              </div>
              <div>
                <span className="text-gray-600 block">Statut</span>
                <span className="font-semibold text-orange-600">en cours</span>
              </div>
              <div>
                <span className="text-gray-600 block">Catégorie</span>
                <span className="font-semibold">Technique</span>
              </div>
              <div>
                <span className="text-gray-600 block">Créé par</span>
                <span className="font-semibold">Jhon Bouali</span>
              </div>
              <div>
                <span className="text-gray-600 block">Créé le</span>
                <span className="font-semibold">10/09/2025</span>
              </div>
              <div>
                <span className="text-gray-600 block">Dernière modification</span>
                <span className="font-semibold">12/09/2025</span>
              </div>
            </div>

            {}
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-600 block mb-2">
                Description
              </span>
              <p className="text-gray-800">
                « Impossible de me connecter à mon compte depuis hier soir. Un
                message Identifiant incorrect s'affiche. »
              </p>
            </div>

            {}
            <div>
              <span className="text-sm font-medium text-gray-600 block mb-2">
                Pièce jointe
              </span>
              <a href="#" className="text-blue-600 hover:underline">
                capture_connexion.png
              </a>
            </div>
          </div>

          {}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Historique de ticket
            </h2>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-3 flex justify-between text-sm">
                  <span className="text-gray-600">10/09/2025</span>
                  <span className="font-medium">Ticket créé par Jhon.B</span>
                </div>
                <div className="px-6 py-3 flex justify-between text-sm">
                  <span className="text-gray-600">11/09/2025</span>
                  <span className="font-medium">Assigné à vous</span>
                </div>
                <div className="px-6 py-3 flex justify-between text-sm">
                  <span className="text-gray-600">12/09/2025</span>
                  <span className="font-medium">Statut mis à jour en cours</span>
                </div>
                <div className="px-6 py-3 flex justify-between text-sm">
                  <span className="text-gray-600">12/09/2025</span>
                  <span className="font-medium">Statut mis à jour en traité</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="w-96 bg-blue-50 border-l border-gray-200 flex flex-col h-full">
          {}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {}
            <div>
              <div className="text-sm text-gray-500">11/09/2025</div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                Bonjour, pouvez-vous préciser le message d’erreur ?
              </div>
            </div>

            {}
            <div className="text-right">
              <div className="text-sm text-gray-500">11/09/2025</div>
              <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
                Ça dit Identifiant incorrect.
              </div>
            </div>

            {}
            <div>
              <div className="text-sm text-gray-500">12/09/2025</div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="mb-4">
                  Merci. Veuillez réinitialiser votre mot de passe via ce lien :{" "}
                  <a href="#" className="text-blue-600">
                    reset.sonaldesk.com
                  </a>
                </p>
                <button className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm"
                 style={{ backgroundColor: "#2E7D32" }}>
                  Marquer comme étant résolu
                </button>
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
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={handleAttachClick}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Paperclip size={18} />
              </button>
              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-lg"
                 style={{
                  borderColor: "#1976D2",
                  backgroundColor: "#1976D2",
                  color: "white",
                }}
              >
                <Send size={16} />
              </button>
            </div>
            {attachment && (
              <div className="mt-2 text-sm text-gray-600">
                Fichier joint : <span className="font-medium">{attachment.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
