import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";

export default function Show() {
  const { ticket } = usePage().props;
  const [message, setMessage] = useState("");

  if (!ticket) return <p>Aucun ticket trouvé.</p>;

  // Envoi message
  const sendMessage = () => {
    if (!message.trim()) return;
    router.post(`/utilisateur/tickets/${ticket.id_ticket}/messages`, {
      message,
    });
    setMessage("");
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Ticket #{ticket.id_ticket}
      </h1>

      {/* Infos ticket */}
      <div className="border p-4 mb-4 rounded bg-white">
        <p><strong>Sujet :</strong> {ticket.sujet ?? "—"}</p>
        <p><strong>Description :</strong> {ticket.description}</p>
        <p><strong>Statut :</strong> {ticket.statut}</p>
        <p><strong>Priorité :</strong> {ticket.priorite}</p>
        <p><strong>Catégorie :</strong> {ticket.categorie?.Nom ?? "—"}</p>
        <p><strong>Agent :</strong> {ticket.agent?.nom ?? "Non assigné"}</p>
        <p><strong>Date de création :</strong> {new Date(ticket.date_creation).toLocaleString()}</p>
      </div>

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

      {/* Historique */}
      <div className="border p-4 mb-4 rounded bg-white">
        <h2 className="font-semibold mb-2">Historique</h2>
        <ul className="list-disc pl-5 space-y-1">
          {ticket.historiques.map((h) => (
            <li key={h.id}>
              {new Date(h.created_at).toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              - {h.action}
            </li>
          ))}
        </ul>
      </div>

      {/* Messages */}
<div className="border p-4 mb-4 rounded bg-white">
  <h2 className="font-semibold mb-2">Discussion</h2>
  <div className="space-y-2">
    {ticket.messages?.length ? (
      ticket.messages.map((m) => {
        const isAgentMessage = m.type_expediteur === 'AGENT';
        const senderName = isAgentMessage
          ? `${ticket.agent?.nom || ''} ${ticket.agent?.prenom || ''}`.trim() || 'Agent'
          : 'Vous';

        return (
          <div
            key={m.id_message || Math.random()} // fallback key just in case
            className={`border-l-4 pl-4 py-2 ${
              isAgentMessage ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <strong className={isAgentMessage ? 'text-green-600' : 'text-blue-600'}>
                {senderName}
              </strong>
              <span className="text-xs text-gray-500">
                {new Date(m.date_envoi || m.created_at).toLocaleString('fr-FR')}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{m.contenu}</p>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500">Aucun message pour le moment.</p>
    )}
  </div>
</div>

        {/* Ajouter un message */}
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 border rounded p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrire un message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 bg-blue-600 text-white rounded"
          >
            Envoyer
          </button>
        </div>
      </div>
    
  );
}
