import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    const agent = auth.user;
    
    return (
        <AuthenticatedLayout>
            <Head title="Agent Dashboard" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Agent Dashboard</h1>
                    <p className="text-gray-600">Welcome, {agent.nom} {agent.prenom}</p>
                    <p className="text-sm text-gray-500">Group: {agent.groupe_relation?.nom || 'No group assigned'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link 
                                href={route('agent.tickets.index')} 
                                className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                View All Tickets
                            </Link>
                            <Link 
                                href={route('agent.tickets.index')} 
                                className="block w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Unassigned Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Agent Info</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Login:</strong> {agent.login || 'Not set'}</p>
                            <p><strong>Email:</strong> {agent.email || 'Not set'}</p>
                            <p><strong>Phone:</strong> {agent.telephone || 'Not set'}</p>
                            <p><strong>Supervisor:</strong> {agent.est_superviseur ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Recent Activity</h2>
                        <Link href={route('agent.tickets.index')} className="text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-500">No recent activity to display.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
