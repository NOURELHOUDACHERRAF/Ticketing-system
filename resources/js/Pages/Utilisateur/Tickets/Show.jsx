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

      {/* Historique */}
      <div className="border p-4 mb-4 rounded bg-white">
        <h2 className="font-semibold mb-2">Historique</h2>
        <ul className="list-disc pl-5 space-y-1">
       {ticket.historiques.map(h => (
         <li key={h.id}>
            {new Date(h.created_at).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
            })} - {h.action}
         </li>
            ))}

        </ul>
      </div>

      {/* Messages */}
      <div className="border p-4 mb-4 rounded bg-white">
        <h2 className="font-semibold mb-2">Discussion</h2>
        <div className="space-y-2">
          {ticket.messages?.map((m) => (
            <div key={m.id_message}>
              <strong>
                {m.utilisateur_auteur?.nom ??
                 m.agent_auteur?.nom ??
                 "Inconnu"}
                :
              </strong>{" "}
              {m.contenu}
            </div>
          ))}
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
    </div>
  );
}
