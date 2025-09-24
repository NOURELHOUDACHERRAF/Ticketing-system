import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';

export default function Index({ unassignedTickets, assignedTickets, supervisedTickets, agent, groupAgents }) {
    return (
        <AgentLayout>
            <Head title="Agent Tickets" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Ticket Management</h1>
                    <p className="text-gray-600">Agent: {agent.nom} {agent.prenom}</p>
                    <p className="text-sm text-gray-500">Group Domain: {agent.groupe_relation?.domaine || 'No group assigned'}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Unassigned Tickets */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-orange-600">Unassigned Tickets</h2>
                            <p className="text-sm text-gray-500">Tickets available for your group domain</p>
                        </div>
                        <div className="p-4">
                            {unassignedTickets.data.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No unassigned tickets available</p>
                            ) : (
                                <div className="space-y-3">
                                    {unassignedTickets.data.map(ticket => (
                                        <TicketCard key={ticket.id_ticket} ticket={ticket} type="unassigned" agent={agent} groupAgents={groupAgents} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Assigned Tickets */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-blue-600">My Assigned Tickets</h2>
                            <p className="text-sm text-gray-500">Tickets assigned to you</p>
                        </div>
                        <div className="p-4">
                            {assignedTickets.data.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No assigned tickets</p>
                            ) : (
                                <div className="space-y-3">
                                    {assignedTickets.data.map(ticket => (
                                        <TicketCard key={ticket.id_ticket} ticket={ticket} type="assigned" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Supervised Tickets */}
                    {agent.est_superviseur && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold text-purple-600">Supervised Tickets</h2>
                                <p className="text-sm text-gray-500">Tickets from your group</p>
                            </div>
                            <div className="p-4">
                                {supervisedTickets.data && supervisedTickets.data.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No supervised tickets</p>
                                ) : (
                                    <div className="space-y-3">
                                        {supervisedTickets.data && supervisedTickets.data.map(ticket => (
                                            <TicketCard key={ticket.id_ticket} ticket={ticket} type="supervised" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AgentLayout>
    );
}

function TicketCard({ ticket, type, agent, groupAgents }) {
    const { post, processing } = useForm();
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState('');

    const handleAssign = () => {
        post(route('agent.tickets.assign', ticket.id_ticket));
    };

    const handleSupervisorAssign = () => {
        if (selectedAgent) {
            router.post(route('agent.tickets.assignAgent', ticket.id_ticket), { agent_id: selectedAgent }, {
                preserveScroll: true,
                onFinish: () => {
                    setShowAssignModal(false);
                    setSelectedAgent('');
                },
            });
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
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">#{ticket.numero_ticket}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.statut)}`}>
                    {ticket.statut}
                </span>
            </div>
            
            <h4 className="font-medium text-sm mb-2">{ticket.type}</h4>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
            
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span>Priority: <span className={getPriorityColor(ticket.priorite)}>{ticket.priorite}</span></span>
                <span>{new Date(ticket.date_creation).toLocaleDateString()}</span>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
                <p>User: {ticket.utilisateur?.nom} {ticket.utilisateur?.prenom}</p>
                <p>Category: {ticket.categorie?.Nom}</p>
            </div>
            
            <div className="flex gap-2">
                <Link 
                    href={route('agent.tickets.show', ticket.id_ticket)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                    View
                </Link>
                {type === 'unassigned' && (
                    <>
                        <button
                            onClick={handleAssign}
                            disabled={processing}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Assigning...' : 'Assign to Me'}
                        </button>
                        {agent?.est_superviseur && (
                            <button
                                onClick={() => setShowAssignModal(true)}
                                className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                            >
                                Assign to Agent
                            </button>
                        )}
                    </>
                )}
                {type === 'supervised' && ticket.agent && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                        Assigned to: {ticket.agent.nom} {ticket.agent.prenom}
                    </span>
                )}
            </div>

            {/* Assignment Modal for Supervisors */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Assign Ticket to Agent</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Select Agent:</label>
                            <select
                                value={selectedAgent}
                                onChange={(e) => setSelectedAgent(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Choose an agent</option>
                                {groupAgents?.map(agent => (
                                    <option key={agent.id_agent} value={agent.id_agent}>
                                        {agent.nom} {agent.prenom}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    setSelectedAgent('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSupervisorAssign}
                                disabled={!selectedAgent || processing}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                            >
                                {processing ? 'Assigning...' : 'Assign'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
