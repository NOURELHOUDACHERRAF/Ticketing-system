import { usePage, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Check, X, Paperclip, Send, ArrowLeft } from "lucide-react";
import SidebarUtilisateur from "@/SideBars/SideBarUtilisateur";

export default function Show() {
  const { ticket, messages } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Envoi message
  const sendMessage = () => {
    if (!message.trim() && !attachment) return;
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('message', message);
    if (attachment) {
      formData.append('piece_jointe', attachment);
    }

    router.post(`/utilisateur/tickets/${ticket.id_ticket}/messages`, formData, {
      onSuccess: () => {
        setMessage("");
        setAttachment(null);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file || null);
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleRetour = () => {
     window.history.back();
  };
    // Accepter solution
  const acceptSolution = () => {
    router.post(`/utilisateur/tickets/${ticket.id_ticket}/accept-solution`);
  };

  // Refuser solution
  const refuseSolution = () => {
    router.post(`/utilisateur/tickets/${ticket.id_ticket}/refuse-solution`);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SidebarUtilisateur sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex h-full">
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {/* Header section */}
          <div className="mb-8">
            <button
              onClick={handleRetour}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft size={18} className="mr-2" /> Retour
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Ticket n°{ticket.id_ticket}
            </h1>
            {/* Boutons Accepter / Refuser si résolu */}
      {ticket.statut === "RESOLU" && (
        <div className="mb-4 flex space-x-2">
          <button
            onClick={acceptSolution}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Accepter la solution
          </button>
          <button
            onClick={refuseSolution}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Refuser la solution
          </button>
        </div>
      )}

            <div className="border border-gray-200 rounded-lg p-6 bg-white mb-6">
              {/* Subject section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-600">
                    Sujet de ticket
                  </label>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {ticket.sujet}
                </div>
              </div>

              {/* Info grid - Display all available ticket information */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Priorité</div>
                  <div className="font-semibold text-blue-600">
                    {ticket.priorite?.nom || ticket.priorite?.Nom || (typeof ticket.priorite === 'string' ? ticket.priorite : "-")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Status</div>
                  <div className="font-semibold text-green-600">
                    {ticket.statut || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Catégorie</div>
                  <div className="font-semibold text-gray-900">
                    {ticket.categorie?.nom || ticket.categorie?.Nom || (typeof ticket.categorie === 'string' ? ticket.categorie : "-")}
                  </div>
                </div>
                
                {/* Additional ticket information */}
                {(ticket.agent_assigne || ticket.agent) && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Agent assigné</div>
                    <div className="font-semibold text-gray-900">
                      {typeof ticket.agent_assigne === 'string' ? ticket.agent_assigne : 
                       typeof ticket.agent === 'string' ? ticket.agent :
                       ticket.agent_assigne?.nom || ticket.agent_assigne?.name ||
                       ticket.agent?.nom || ticket.agent?.name || "-"}
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Créé le</div>
                  <div className="font-semibold text-gray-900">
                    {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('fr-FR') : 
                     ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR') : "-"}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-2">Dernière modification</div>
                  <div className="font-semibold text-gray-900">
                    {ticket.updated_at ? new Date(ticket.updated_at).toLocaleDateString('fr-FR') : 
                     ticket.date_modification ? new Date(ticket.date_modification).toLocaleDateString('fr-FR') : "-"}
                  </div>
                </div>

                {ticket.date_echeance && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Date d'échéance</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(ticket.date_echeance).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                )}

                {(ticket.utilisateur || ticket.user) && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Créé par</div>
                    <div className="font-semibold text-gray-900">
                      {ticket.utilisateur?.nom || ticket.utilisateur?.name || ticket.user?.nom || ticket.user?.name || "-"}
                    </div>
                  </div>
                )}

                {ticket.service && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Service</div>
                    <div className="font-semibold text-gray-900">
                      {typeof ticket.service === 'string' ? ticket.service : ticket.service?.nom || ticket.service?.name || "-"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <div className="text-sm font-medium text-gray-600 mb-3">
                Description
              </div>
              <p className="text-gray-800 leading-relaxed">
                {ticket.description}
              </p>
            </div>

            {/* Attachment */}
            {ticket.piece_jointe && (
              <div className="mb-8">
                <div className="text-sm font-medium text-gray-600 mb-3">
                  Pièce jointe
                </div>
                <a
                  href={`/storage/${ticket.piece_jointe}`}
                  target="_blank"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {ticket.piece_jointe}
                </a>
              </div>
            )}

            {/* History */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Historique de ticket
              </h2>
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="divide-y divide-gray-200">
                  {ticket.historiques?.map((h, i) => (
                    <div key={i} className="flex justify-between items-center px-6 py-4">
                      <span className="text-sm text-gray-900 font-medium">{h.action}</span>
                      <span className="text-sm text-gray-600">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {(messages?.length || ticket.messages?.length) ? (
              (messages || ticket.messages).map((m) => {
                const isAgentMessage = m.type_expediteur === 'AGENT' || (m.auteur?.id !== ticket.user_id);
                const senderName = isAgentMessage
                  ? m.auteur?.nom || `${ticket.agent?.nom || ''} ${ticket.agent?.prenom || ''}`.trim() || 'Agent'
                  : 'Vous';
                const messageDate = m.date_envoi || m.date || m.created_at;

                return (
                  <div key={m.id_message || m.id || Math.random()} className="space-y-2">
                    {isAgentMessage ? (
                      // Agent message - à gauche
                      <>
                        <div className="flex items-center text-sm">
                          <span className="font-semibold text-gray-900">{senderName}</span>
                          <span className="ml-auto text-gray-500">
                            {messageDate ? new Date(messageDate).toLocaleString('fr-FR') : ''}
                          </span>
                        </div>
                        <div className="flex justify-start">
                          <div className={`rounded-lg p-4 shadow-sm max-w-xs ${
                            ticket.statut === "Résolu" && m === (messages || ticket.messages)[(messages || ticket.messages).length - 1] 
                              ? "bg-blue-600 text-white" 
                              : "bg-white border border-gray-200"
                          }`}>
                            <p className={ticket.statut === "Résolu" && m === (messages || ticket.messages)[(messages || ticket.messages).length - 1] ? "text-white mb-4" : "text-gray-800"}>
                              {m.contenu}
                            </p>
                            {m.piece_jointe && (
                              <a
                                href={`/storage/${m.piece_jointe}`}
                                target="_blank"
                                className={`text-sm underline ${
                                  ticket.statut === "Résolu" && m === (messages || ticket.messages)[(messages || ticket.messages).length - 1] ? "text-white" : "text-blue-600"
                                }`}
                              >
                                📎 Pièce jointe
                              </a>
                            )}
                            
                           
                          </div>
                        </div>
                      </>
                    ) : (
                      // User message - à droite
                      <>
                        <div className="text-sm text-gray-500 text-right">
                          {messageDate ? new Date(messageDate).toLocaleString('fr-FR') : ''}
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                            <p className="text-gray-800">{m.contenu}</p>
                            {m.piece_jointe && (
                              <a
                                href={`/storage/${m.piece_jointe}`}
                                target="_blank"
                                className="text-sm underline text-blue-600"
                              >
                                📎 Pièce jointe
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">Aucun message pour le moment.</p>
            )}
          </div>

          {/* Send message form */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                  type="button"
                  onClick={handleAttachClick}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip size={18} />
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || (!message.trim() && !attachment)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: "#1976D2",
                    backgroundColor: "#1976D2",
                    color: "white",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
            
            {attachment && (
              <div className="mt-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded border">
                Fichier joint : <span className="font-medium">{attachment.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}