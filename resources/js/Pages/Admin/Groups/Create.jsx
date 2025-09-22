import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ agents }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        domaine: '',
        superviseur_id: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.groups.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="New Group" />
            <div className="p-6 max-w-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Group</h1>
                    <Link href={route('admin.groups.index')} className="text-blue-600">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input value={data.nom} onChange={e => setData('nom', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Domain</label>
                        <input value={data.domaine} onChange={e => setData('domaine', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.domaine && <div className="text-red-600 text-sm mt-1">{errors.domaine}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Supervisor</label>
                        <select value={data.superviseur_id} onChange={e => setData('superviseur_id', e.target.value)} className="w-full border rounded px-3 py-2">
                            <option value="">None</option>
                            {agents?.map(a => (
                                <option key={a.id_agent} value={a.id_agent}>{a.nom} {a.prenom}</option>
                            ))}
                        </select>
                        {errors.superviseur_id && <div className="text-red-600 text-sm mt-1">{errors.superviseur_id}</div>}
                    </div>
                    <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
