import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ groups }) {
    const { data, setData, post, processing, errors } = useForm({
        Nom: '',
        description: '',
        id_grp: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.categories.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="New Category" />
            <div className="p-6 max-w-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create Category</h1>
                    <Link href={route('admin.categories.index')} className="text-blue-600">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input value={data.Nom} onChange={e => setData('Nom', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.Nom && <div className="text-red-600 text-sm mt-1">{errors.Nom}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border rounded px-3 py-2" rows="3" />
                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Group</label>
                        <select value={data.id_grp} onChange={e => setData('id_grp', e.target.value)} className="w-full border rounded px-3 py-2">
                            <option value="">Select group</option>
                            {groups.map(g => (
                                <option key={g.id_groupe} value={g.id_groupe}>{g.nom}</option>
                            ))}
                        </select>
                        {errors.id_grp && <div className="text-red-600 text-sm mt-1">{errors.id_grp}</div>}
                    </div>
                    <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
