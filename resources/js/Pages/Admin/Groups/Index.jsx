import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ groups, agents }) {
    return (
        <AuthenticatedLayout>
            <Head title="Groups" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Groups</h1>
                    <Link href={route('admin.groups.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New Group</Link>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Domain</th>
                            <th className="py-2">Supervisor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.data.map(g => (
                            <Row key={g.id_groupe} g={g} agents={agents} />
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

function Row({ g, agents }) {
    const { data, setData, post, processing } = useForm({ superviseur_id: g.superviseur_id || '' });
    function submit(e) {
        e.preventDefault();
        post(route('admin.groups.setSupervisor', g.id_groupe));
    }
    return (
        <tr className="border-t">
            <td className="py-2">{g.nom}</td>
            <td className="py-2">{g.domaine}</td>
            <td className="py-2">
                <form onSubmit={submit} className="flex items-center gap-2">
                    <select value={data.superviseur_id} onChange={e => setData('superviseur_id', e.target.value)} className="border rounded px-2 py-1">
                        <option value="">None</option>
                        {agents.map(a => (
                            <option key={a.id_agent} value={a.id_agent}>{a.nom} {a.prenom}</option>
                        ))}
                    </select>
                    <button disabled={processing} className="px-2 py-1 bg-gray-200 rounded">Save</button>
                </form>
            </td>
            <td className="py-2 text-right">
                <Link href={route('admin.groups.edit', g.id_groupe)} className="text-blue-600">Edit</Link>
            </td>
        </tr>
    );
}
