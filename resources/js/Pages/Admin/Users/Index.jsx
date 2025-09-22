import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ users, units }) {
    return (
        <AuthenticatedLayout>
            <Head title="Users" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Users</h1>
                    <Link href={route('admin.users.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New User</Link>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Email</th>
                            <th className="py-2">Unit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map(u => (
                            <Row key={u.id_utilisateur} u={u} units={units} />
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

function Row({ u, units }) {
    const { data, setData, post, processing } = useForm({ Unit_org: u.Unit_org || '' });
    function submit(e) {
        e.preventDefault();
        post(route('admin.users.assignUnit', u.id_utilisateur));
    }
    return (
        <tr className="border-t">
            <td className="py-2">{u.nom} {u.prenom}</td>
            <td className="py-2">{u.email ?? '-'}</td>
            <td className="py-2">
                <form onSubmit={submit} className="flex items-center gap-2">
                    <select value={data.Unit_org} onChange={e => setData('Unit_org', e.target.value)} className="border rounded px-2 py-1">
                        <option value="">None</option>
                        {units.map(unit => (
                            <option key={unit.Num} value={unit.Num}>{unit.nom}</option>
                        ))}
                    </select>
                    <button disabled={processing} className="px-2 py-1 bg-gray-200 rounded">Save</button>
                </form>
            </td>
            <td className="py-2 text-right">
                <Link href={route('admin.users.edit', u.id_utilisateur)} className="text-blue-600">Edit</Link>
            </td>
        </tr>
    );
}
