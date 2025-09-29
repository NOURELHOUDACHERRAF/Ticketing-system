import React, { useRef, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AgentLayout from '@/Headers/AgentLayout';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';

export default function Show({ ticket, agent }) {
    const { data, setData, post, processing } = useForm({ contenu: '' });
    const { post: postHelp, processing: helpProcessing } = useForm();
    const [attachment, setAttachment] = useState(null);
    const fileInputRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('contenu', data.contenu);
        if (attachment) formData.append('piece_jointe', attachment);
        router.post(route('agent.tickets.message', ticket.id_ticket), formData, {
            forceFormData: true,
            onSuccess: () => {
                setData('contenu', '');
                setAttachment(null);
            },
        });
    };

    const handleRequestHelp = () => {
        if (confirm("Are you sure you want to request help for this ticket? This will unassign it from you and make it available to other agents.")) {
            postHelp(route('agent.tickets.requestHelp', ticket.id_ticket));
        }
    };

    const handleAttachClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAttachment(file || null);
    };

    return (
        <AgentLayout>
            <Head title={`Ticket #${ticket.numero_ticket}`} />
            
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Main content */}
                <div className="flex-1 flex h-full">
                    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
                        {/* Header section */}
                        <div className="mb-8">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
                            >
                                <ArrowLeft size={18} className="mr-2" /> Retour
                            </button>

                            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                                Ticket n°{ticket.numero_ticket}
                            </h1>

                            {/* Action Buttons */}
                            {ticket.statut === 'EN_COURS' && ticket.agent_id === agent.id_agent && (
                                <div className="mb-4 flex space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            post(route('agent.tickets.resolve', { ticket: ticket.id_ticket }));
                                        }}
                                        disabled={processing}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Resolving...' : 'Marquer comme résolu'}
                                    </button>
                                    <button
                                        onClick={handleRequestHelp}
                                        disabled={helpProcessing}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {helpProcessing ? 'Requesting Help...' : 'Demander de l\'aide'}
                                    </button>
                                </div>
                            )}

                            <div className="border border-gray-200 rounded-lg p-6 bg-white mb-6">
                                {/* Subject section */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-600">
                                            Type de ticket
                                        </label>
                                    </div>
                                    <div className="text-xl font-semibold text-gray-900">
                                        {ticket.type}
                                    </div>
                                </div>

                                {/* Info grid */}
                                <div className="grid grid-cols-3 gap-8 mb-8">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Priorité</div>
                                        <div className="font-semibold text-blue-600">
                                            {ticket.priorite || "-"}
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
                                            {ticket.categorie?.Nom || "-"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Agent assigné</div>
                                        <div className="font-semibold text-gray-900">
                                            {ticket.agent ? `${ticket.agent.nom} ${ticket.agent.prenom}` : "-"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Créé le</div>
                                        <div className="font-semibold text-gray-900">
                                            {ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR') : "-"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Dernière modification</div>
                                        <div className="font-semibold text-gray-900">
                                            {ticket.date_modification ? new Date(ticket.date_modification).toLocaleDateString('fr-FR') : "-"}
                                        </div>
                                    </div>

                                    {ticket.date_resolution && (
                                        <div>
                                            <div className="text-sm text-gray-600 mb-2">Date de résolution</div>
                                            <div className="font-semibold text-gray-900">
                                                {new Date(ticket.date_resolution).toLocaleDateString('fr-FR')}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Créé par</div>
                                        <div className="font-semibold text-gray-900">
                                            {ticket.utilisateur ? `${ticket.utilisateur.nom} ${ticket.utilisateur.prenom}` : "-"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-600 mb-2">Superviseur</div>
                                        <div className="font-semibold text-gray-900">
                                            {ticket.superviseur ? `${ticket.superviseur.nom} ${ticket.superviseur.prenom || ''}` : "-"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <div className="text-sm font-medium text-gray-600 mb-3">
                                    Description
                                </div>
                                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {ticket.description}
                                </p>
                            </div>

                            {/* Motif */}
                            {ticket.motif && (
                                <div className="mb-8">
                                    <div className="text-sm font-medium text-gray-600 mb-3">
                                        Motif
                                    </div>
                                    <p className="text-gray-800 leading-relaxed">
                                        {ticket.motif}
                                    </p>
                                </div>
                            )}

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
                                        {ticket.historiques && ticket.historiques.length > 0 ? (
                                            ticket.historiques.map((h, i) => (
                                                <div key={i} className="flex justify-between items-center px-6 py-4">
                                                    <span className="text-sm text-gray-900 font-medium">{h.action}</span>
                                                    <span className="text-sm text-gray-600">{h.date}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-4 text-sm text-gray-500">Aucun historique</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat panel */}
                    <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
                        {/* Messages */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            {ticket.messages && ticket.messages.length > 0 ? (
                                ticket.messages.map((m) => {
                                    const isAgentMessage = m.type_expediteur === 'AGENT';
                                    const senderName = isAgentMessage
                                        ? 'Vous'
                                        : `${ticket.utilisateur?.nom || ''} ${ticket.utilisateur?.prenom || ''}`.trim() || 'Utilisateur';
                                    const messageDate = m.date_envoi || m.created_at;

                                    return (
                                        <div key={m.id_message || Math.random()} className="space-y-2">
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
                                                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-xs">
                                                            <p className="text-gray-800">{m.contenu}</p>
                                                            {m.piece_jointe && (
                                                                <a
                                                                    href={`/storage/${m.piece_jointe}`}
                                                                    target="_blank"
                                                                    className="text-sm underline text-blue-600 mt-2 inline-block"
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
                                                                    className="text-sm underline text-blue-600 mt-2 inline-block"
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
                                        value={data.contenu}
                                        onChange={(e) => setData('contenu', e.target.value)}
                                        placeholder="Écrire un message..."
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
                                        disabled={processing || !data.contenu.trim()}
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
        </AgentLayout>
    );
}