import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ agents, groups }) {
    return (
        <AuthenticatedLayout>
            <Head title="Agents" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Agents</h1>
                    <Link href={route('admin.agents.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New Agent</Link>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.data.map(a => (
                            <Row key={a.id_agent} a={a} groups={groups} />
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

function Row({ a, groups }) {
    const { data, setData, post, processing } = useForm({ groupe: a.groupe || '' });
    function submit(e) {
        e.preventDefault();
        post(route('admin.agents.assignGroup', a.id_agent));
    }
    return (
        <tr className="border-t">
            <td className="py-2">{a.nom} {a.prenom}</td>
            <td className="py-2">{a.email ?? '-'}</td>
            <td className="py-2">
                <form onSubmit={submit} className="flex items-center gap-2">
                    <select value={data.groupe} onChange={e => setData('groupe', e.target.value)} className="border rounded px-2 py-1">
                        <option value="">None</option>
                        {groups.map(g => (
                            <option key={g.id_groupe} value={g.id_groupe}>{g.nom}</option>
                        ))}
                    </select>
                    <button disabled={processing} className="px-2 py-1 bg-gray-200 rounded">Save</button>
                </form>
            </td>
            <td className="py-2 text-right">
                <Link href={route('admin.agents.edit', a.id_agent)} className="text-blue-600">Edit</Link>
            </td>
        </tr>
    );
}
