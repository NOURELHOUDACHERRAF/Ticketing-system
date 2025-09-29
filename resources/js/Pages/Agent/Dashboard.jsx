import React, { useState, useRef, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AgentLayout from '@/Headers/AgentLayout';
import FiltersModal from '@/Pages/Utilisateur/filtre';
import SortModal from '@/Pages/Utilisateur/trier';

export default function Dashboard({ auth, assignedTickets, unassignedTickets, supervisedTickets, groupAgents }) {
    const agent = auth.user;
    const [activeTab, setActiveTab] = useState('assigned');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState({});

    const tabs = [
        { key: 'assigned', label: 'Mes tickets' },
        { key: 'unassigned', label: 'Non assignés' },
        ...(agent.est_superviseur ? [{ key: 'supervised', label: 'Supervisés' }] : [])
    ];

    

    const getStatusColor = (status) => {
        switch ((status || '').toUpperCase()) {
            case 'NOUVEAU':
                return 'text-orange-600 bg-orange-50';
            case 'EN_COURS':
            case 'EN COURS':
                return 'text-blue-600 bg-blue-50';
            case 'RESOLU':
            case 'RÉSOLU':
            case 'TRAITE':
            case 'TRAITÉ':
                return 'text-green-600 bg-green-50';
            case 'CLOS':
                return 'text-gray-600 bg-gray-50';
            case 'DEMANDE_AIDE':
                return 'text-yellow-600 bg-yellow-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getPriorityColor = (priority) => {
        switch ((priority || '').toUpperCase()) {
            case 'CRITIQUE':
                return 'text-red-700 bg-red-100';
            case 'HAUTE':
            case 'URGENT':
                return 'text-red-600 bg-red-50';
            case 'MOYENNE':
            case 'NORMAL':
            case 'NORMALE':
                return 'text-blue-600 bg-blue-50';
            case 'BASSE':
            case 'FAIBLE':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getList = () => {
        if (activeTab === 'assigned') return assignedTickets?.data || [];
        if (activeTab === 'unassigned') return unassignedTickets?.data || [];
        if (activeTab === 'supervised') return supervisedTickets?.data || [];
        return [];
    };

    const applyFilters = (ticketsToFilter, filters = {}) => {
        let filtered = [...ticketsToFilter];

        if (filters.agent && filters.agent !== '') {
            filtered = filtered.filter(t => {
                const agentName = t.agent?.nom ? `${t.agent.nom} ${t.agent.prenom || ''}` : (t.agent || '');
                return agentName.toLowerCase().includes(filters.agent.toLowerCase());
            });
        }

        if (filters.categories && filters.categories.length > 0) {
            filtered = filtered.filter(t => {
                const categoryName = t.categorie?.Nom || t.categorie?.nom || '';
                return filters.categories.includes(categoryName);
            });
        }

        if (filters.priorities && filters.priorities.length > 0) {
            filtered = filtered.filter(t => filters.priorities.includes(t.priorite));
        }

        if (filters.statuses && filters.statuses.length > 0) {
            filtered = filtered.filter(t => filters.statuses.includes(t.statut));
        }

        if (filters.creationDate && filters.creationDate !== '') {
            filtered = filtered.filter(t => {
                const d = t.date_creation ? new Date(t.date_creation).toISOString().split('T')[0] : '';
                return d === filters.creationDate;
            });
        }

        return filtered;
    };

    const applySearch = (ticketsToFilter, query) => {
        if (!query.trim()) return ticketsToFilter;
        const term = query.toLowerCase().trim();
        return ticketsToFilter.filter(t => {
            const agentName = t.agent?.nom ? `${t.agent.nom} ${t.agent.prenom || ''}` : (t.agent || '');
            const catName = t.categorie?.Nom || t.categorie?.nom || '';
            return (
                String(t.id_ticket || '').toLowerCase().includes(term) ||
                String(t.numero_ticket || '').toLowerCase().includes(term) ||
                (t.type || '').toLowerCase().includes(term) ||
                (t.statut || '').toLowerCase().includes(term) ||
                (t.priorite || '').toLowerCase().includes(term) ||
                agentName.toLowerCase().includes(term) ||
                catName.toLowerCase().includes(term)
            );
        });
    };

    const activeData = useMemo(() => getList(), [activeTab, assignedTickets, unassignedTickets, supervisedTickets]);
    const filteredData = useMemo(() => {
        let res = activeData;
        if (Object.keys(appliedFilters).length > 0) res = applyFilters(res, appliedFilters);
        res = applySearch(res, searchQuery);
        return res;
    }, [activeData, appliedFilters, searchQuery]);

    return (
        <AgentLayout>
            <Head title="Agent Dashboard" />

                <div className="mb-6">
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                <p className="text-gray-600">{agent.nom} {agent.prenom}</p>
                <p className="text-sm text-gray-500">Groupe: {agent.groupe_relation?.nom || 'Aucun'}</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="flex gap-2 p-3 border-b">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`px-4 py-2 rounded-md text-sm ${activeTab === t.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="p-4">
                    {(searchQuery || Object.keys(appliedFilters).length > 0) && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-blue-700">
                                    {searchQuery && (
                                        <span>Recherche : "<strong>{searchQuery}</strong>"</span>
                                    )}
                                    {searchQuery && Object.keys(appliedFilters).length > 0 && <span> • </span>}
                                    {Object.keys(appliedFilters).length > 0 && (
                                        <span>Filtres actifs</span>
                                    )}
                                    <span className="ml-2">- {filteredData.length} résultat(s)</span>
                                </div>
                                <button onClick={() => { setAppliedFilters({}); setSearchQuery(''); }} className="text-blue-600 hover:text-blue-800 underline text-sm">Tout effacer</button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Rechercher"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-72 pl-3 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                            />
                        </div>

                        <div className="flex space-x-3 w-full sm:w-auto">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg transition-colors shadow-sm ${
                                    Object.keys(appliedFilters).length > 0
                                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                Filtrer
                                {Object.keys(appliedFilters).length > 0 && (
                                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                                        {Object.keys(appliedFilters).length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setIsSortModalOpen(true)}
                                className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg transition-colors shadow-sm hover:bg-gray-50"
                            >
                                Trier
                            </button>
                        </div>
                    </div>

                    {filteredData.length === 0 ? (
                        <p className="text-gray-500 text-center py-6">Aucun ticket</p>
                    ) : (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">N° Ticket</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Sujet</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Catégorie</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Statut</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Priorité</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Agent</th>
                                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">Créé</th>
                                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredData.map((ticket) => (
                                            <tr key={ticket.id_ticket} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-3 py-3 text-xs font-medium text-gray-900">#{ticket.numero_ticket || ticket.id_ticket}</td>
                                                <td className="px-3 py-3 text-xs text-gray-700">
                                                    <div className="max-w-[120px] truncate" title={ticket.type}>{ticket.type || '-'}</div>
                                                </td>
                                                <td className="px-3 py-3 text-xs text-gray-700">
                                                    <div className="max-w-[120px] truncate" title={ticket.categorie?.Nom || ticket.categorie?.nom}>
                                                        {ticket.categorie?.Nom || ticket.categorie?.nom || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(ticket.statut)}`}>
                                                        {ticket.statut || '-'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getPriorityColor(ticket.priorite)}`}>
                                                        {ticket.priorite || 'NORMAL'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-xs text-gray-700">
                                                    <div className="max-w-[120px] truncate" title={ticket.agent?.nom || ticket.agent}>
                                                        {ticket.agent?.nom ? `${ticket.agent?.nom} ${ticket.agent?.prenom || ''}`.trim() : (ticket.agent || (activeTab === 'unassigned' ? 'Non assigné' : '-'))}
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-xs text-gray-500">
                                                    {ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '-'}
                                                </td>
                                                <td className="px-3 py-3 text-center">
                                                    <div className="inline-flex items-center gap-2">
                                                        <Link href={route('agent.tickets.show', ticket.id_ticket)} className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">Voir</Link>
                                                        {activeTab === 'unassigned' && (
                                                            <>
                                                                <Link href={route('agent.tickets.assign', ticket.id_ticket)} method="post" as="button" className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">M'assigner</Link>
                                                                {agent.est_superviseur && (
                                                                    <AssignToAgentPopover ticketId={ticket.id_ticket} groupAgents={groupAgents} />
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="lg:hidden divide-y divide-gray-200">
                                {filteredData.map((ticket) => (
                                    <div key={ticket.id_ticket} className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm font-semibold text-gray-900">#{ticket.numero_ticket || ticket.id_ticket}</span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.statut)}`}>{ticket.statut}</span>
                                        </div>
                        <div className="space-y-2 text-sm">
                                            <div className="text-gray-700"><span className="font-medium text-gray-900">Type :</span> {ticket.type || '-'}</div>
                                            <div className="text-gray-700"><span className="font-medium text-gray-900">Catégorie :</span> {ticket.categorie?.Nom || ticket.categorie?.nom || '-'}</div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-gray-700">
                                                    <span className="font-medium text-gray-900">Priorité :</span>
                                                    <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priorite)}`}>{ticket.priorite || 'NORMAL'}</span>
                                                </div>
                                            </div>
                                            <div className="text-gray-700"><span className="font-medium text-gray-900">Agent :</span> {ticket.agent?.nom ? `${ticket.agent?.nom} ${ticket.agent?.prenom || ''}`.trim() : (ticket.agent || (activeTab === 'unassigned' ? 'Non assigné' : '-'))}</div>
                                            <div className="text-gray-500 text-xs">
                                                <div>Créé le {ticket.date_creation ? new Date(ticket.date_creation).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                                            <Link href={route('agent.tickets.show', ticket.id_ticket)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Consulter</Link>
                                            {activeTab === 'unassigned' && (
                                                <Link href={route('agent.tickets.assign', ticket.id_ticket)} method="post" as="button" className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">M'assigner</Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t text-right">
                    <Link href={route('agent.tickets.index')} className="text-blue-600 hover:underline text-sm">Gérer les tickets</Link>
                </div>
            </div>

            {isFilterOpen && (
                <FiltersModal
                    onClose={() => setIsFilterOpen(false)}
                    onApply={(filters) => { setAppliedFilters(filters); setIsFilterOpen(false); }}
                    appliedFilters={appliedFilters}
                    filterOptions={{
                        agents: [...new Set([
                            ...((assignedTickets?.data || []).map(t => t.agent?.nom ? `${t.agent.nom} ${t.agent.prenom || ''}` : t.agent).filter(Boolean)),
                            ...((supervisedTickets?.data || []).map(t => t.agent?.nom ? `${t.agent.nom} ${t.agent.prenom || ''}` : t.agent).filter(Boolean)),
                        ])],
                        categories: [...new Set([
                            ...((assignedTickets?.data || []).map(t => t.categorie?.Nom || t.categorie?.nom).filter(Boolean)),
                            ...((unassignedTickets?.data || []).map(t => t.categorie?.Nom || t.categorie?.nom).filter(Boolean)),
                            ...((supervisedTickets?.data || []).map(t => t.categorie?.Nom || t.categorie?.nom).filter(Boolean)),
                        ])],
                        priorities: [...new Set([
                            ...((assignedTickets?.data || []).map(t => t.priorite).filter(Boolean)),
                            ...((unassignedTickets?.data || []).map(t => t.priorite).filter(Boolean)),
                            ...((supervisedTickets?.data || []).map(t => t.priorite).filter(Boolean)),
                        ])],
                        statuses: [...new Set([
                            ...((assignedTickets?.data || []).map(t => t.statut).filter(Boolean)),
                            ...((unassignedTickets?.data || []).map(t => t.statut).filter(Boolean)),
                            ...((supervisedTickets?.data || []).map(t => t.statut).filter(Boolean)),
                        ])],
                    }}
                />
            )}

            {isSortModalOpen && (
                <SortModal
                    onClose={() => setIsSortModalOpen(false)}
                    onApply={(sortData) => {
                        // Client-side sort in-place on filteredData by reordering within the active dataset
                        const arr = [...activeData];
                        arr.sort((a, b) => {
                            let A, B;
                            switch (sortData.sort) {
                                case 'creation':
                                    A = new Date(a.date_creation || 0);
                                    B = new Date(b.date_creation || 0);
                                    break;
                                case 'modification':
                                    A = new Date(a.date_modification || 0);
                                    B = new Date(b.date_modification || 0);
                                    break;
                                case 'priority':
                                    const order = { 'CRITIQUE': 4, 'HAUTE': 3, 'MOYENNE': 2, 'NORMALE': 2, 'BASSE': 1 };
                                    A = order[a.priorite] || 0;
                                    B = order[b.priorite] || 0;
                                    break;
                                case 'status':
                                    A = a.statut || '';
                                    B = b.statut || '';
                                    break;
                                default:
                                    A = a.id_ticket;
                                    B = b.id_ticket;
                            }
                            return sortData.order === 'asc' ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
                        });
                        // Force recompute by toggling filters (no-op)
                        setAppliedFilters(f => ({ ...f }));
                        setIsSortModalOpen(false);
                    }}
                />
            )}
        </AgentLayout>
    );
}

function AssignToAgentPopover({ ticketId, groupAgents }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const ref = useRef(null);

    const assign = () => {
        if (!selected) return;
        router.post(route('agent.tickets.assignAgent', ticketId), { agent_id: selected }, {
            preserveScroll: true,
            onFinish: () => setOpen(false),
        });
    };

    return (
        <div className="relative inline-block" ref={ref}>
            <button onClick={() => setOpen((v) => !v)} className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700">Assigner à…</button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-3 z-50">
                    <div className="text-xs font-medium text-gray-700 mb-2">Choisir un agent</div>
                    <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full border rounded px-2 py-1 text-sm mb-2">
                        <option value="">— Sélectionner —</option>
                        {groupAgents?.map(a => (
                            <option key={a.id_agent} value={a.id_agent}>{a.nom} {a.prenom}</option>
                        ))}
                    </select>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setOpen(false)} className="px-2 py-1 text-xs rounded border">Annuler</button>
                        <button onClick={assign} disabled={!selected} className="px-2 py-1 text-xs rounded bg-purple-600 text-white disabled:opacity-50">Assigner</button>
                    </div>
                </div>
            )}
        </div>
    );
}
