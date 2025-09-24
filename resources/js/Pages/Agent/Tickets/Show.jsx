import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';

export default function Show({ ticket, agent }) {
    const { data, setData, post, processing } = useForm({
        contenu: '',
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route('agent.tickets.message', ticket.id_ticket), {
            onSuccess: () => setData('contenu', ''),
        });
    };

    const { post: postHelp, processing: helpProcessing } = useForm();
    const handleRequestHelp = () => {
        if (confirm('Are you sure you want to request help for this ticket? This will unassign it from you and make it available to other agents.')) {
            postHelp(route('agent.tickets.requestHelp', ticket.id_ticket));
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'NOUVEAU': 'bg-gray-100 text-gray-800',
            'EN_COURS': 'bg-blue-100 text-blue-800',
            'DEMANDE_AIDE': 'bg-yellow-100 text-yellow-800',
            'RESOLU': 'bg-green-100 text-green-800',
            'CLOS': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'CRITIQUE': 'text-red-600 font-bold',
            'HAUTE': 'text-orange-600 font-semibold',
            'NORMALE': 'text-blue-600',
            'BASSE': 'text-gray-600',
        };
        return colors[priority] || 'text-gray-600';
    };

    return (
        <AgentLayout>
            <Head title={`Ticket #${ticket.numero_ticket}`} />
            <div className="p-6 max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href={route('agent.tickets.index')} className="text-blue-600 hover:underline mb-4 inline-block">
                        ← Back to Tickets
                    </Link>
                    <h1 className="text-2xl font-bold">Ticket #{ticket.numero_ticket}</h1>
                </div>
                 {/* Action Buttons */}


{ticket.statut === 'EN_COURS' && ticket.agent_id === agent.id_agent && (
    <div className="mt-4 pt-4 border-t">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                post(route('agent.tickets.resolve', { ticket: ticket.id_ticket }));
            }}
        >
            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
                {processing ? 'Resolving...' : 'Marquer comme résolu'}
            </button>
        </form>
    </div>
)}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ticket Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-lg font-semibold">{ticket.type}</h2>
                                <div className="flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.statut)}`}>
                                        {ticket.statut}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(ticket.priorite)}`}>
                                        {ticket.priorite}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <h3 className="font-medium mb-2">Description</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                            </div>

                            {ticket.motif && (
                                <div className="mb-4">
                                    <h3 className="font-medium mb-2">Motif</h3>
                                    <p className="text-gray-700">{ticket.motif}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <strong>Created:</strong> {new Date(ticket.date_creation).toLocaleString()}
                                </div>
                                <div>
                                    <strong>Last Modified:</strong> {new Date(ticket.date_modification).toLocaleString()}
                                </div>
                                {ticket.date_resolution && (
                                    <div>
                                        <strong>Resolved:</strong> {new Date(ticket.date_resolution).toLocaleString()}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            {ticket.agent_id === agent.id_agent && ticket.statut === 'EN_COURS' && (
                                <div className="mt-4 pt-4 border-t">
                                    <button
                                        onClick={handleRequestHelp}
                                        disabled={helpProcessing}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {helpProcessing ? 'Requesting Help...' : 'Request Help'}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        This will unassign the ticket from you and make it available to other agents in your group.
                                    </p>
                                </div>
                            )}
                        </div>

{/* Messages */}
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-semibold mb-4">Messages</h3>

  {ticket.messages && ticket.messages.length > 0 ? (
    ticket.messages.map((m) => {
      const isAgent = m.type_expediteur === 'AGENT';

      // Determine sender name
      const senderName = isAgent
        ? 'Vous'
        : `${ticket.utilisateur?.nom || ''} ${ticket.utilisateur?.prenom || ''}`.trim() || 'Utilisateur';

      return (
        <div
          key={m.id_message || Math.random()} // fallback key just in case
          className={`border-l-4 pl-4 py-2 ${isAgent ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}
        >
          <div className="flex justify-between items-start mb-1">
            <strong className={isAgent ? 'text-green-600' : 'text-blue-600'}>
              {senderName}
            </strong>
            <span className="text-xs text-gray-500">
              {new Date(m.date_envoi || m.created_at).toLocaleString('fr-FR')}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{m.contenu}</p>

          {m.type === "PROPOSITION_SOLUTION" 
  && ticket.statut === 'RESOLU' 
  && !agent && ( // pas d'agent => côté utilisateur
    <div className="mt-3 space-x-2">
      <button 
        onClick={acceptSolution}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
      >
        Accepter la solution
      </button>
      <button 
        onClick={refuseSolution}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
      >
        Refuser la solution
      </button>
    </div>
)}

        </div>
      );
    })
  ) : (
    <p className="text-gray-500 italic">Aucun message pour le moment.</p>
  )}
</div>

                            {/* Send Message Form */}
                            <form onSubmit={handleSendMessage} className="mt-4">
                                <div className="flex gap-2">
                                    <textarea
                                        value={data.contenu}
                                        onChange={e => setData('contenu', e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 border rounded px-3 py-2 resize-none"
                                        rows="3"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing || !data.contenu.trim()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">User Information</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Name:</strong> {ticket.utilisateur?.nom} {ticket.utilisateur?.prenom}</p>
                                <p><strong>Email:</strong> {ticket.utilisateur?.email || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {ticket.utilisateur?.telephone || 'Not provided'}</p>
                                <p><strong>Unit:</strong> {ticket.utilisateur?.unite_organisationnelle?.nom || 'Not assigned'}</p>
                            </div>
                        </div>

                        {/* Category Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Category</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Name:</strong> {ticket.categorie?.Nom}</p>
                                <p><strong>Description:</strong> {ticket.categorie?.description || 'No description'}</p>
                                <p><strong>Group:</strong> {ticket.categorie?.groupe?.nom}</p>
                            </div>
                        </div>

                        {/* Assignment Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Assignment</h3>
                            <div className="space-y-2 text-sm">
                                <p><strong>Agent:</strong> {ticket.agent?.nom} {ticket.agent?.prenom}</p>
                                <p><strong>Supervisor:</strong> {ticket.superviseur?.nom} {ticket.superviseur?.prenom || 'Not assigned'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </AgentLayout>
    );
}
