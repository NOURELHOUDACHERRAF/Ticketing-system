import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ unit }) {
    const { data, setData, put, processing, errors } = useForm({
        Num: unit.Num,
        nom: unit.nom,
        Abreviation: unit.Abreviation ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.units.update', unit.Num));
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Unit #${unit.Num}`} />
            <div className="p-6 max-w-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Edit Unit</h1>
                    <Link href={route('admin.units.index')} className="text-blue-600">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Num</label>
                        <input type="number" value={data.Num} onChange={e => setData('Num', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.Num && <div className="text-red-600 text-sm mt-1">{errors.Num}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input value={data.nom} onChange={e => setData('nom', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Abbreviation</label>
                        <input value={data.Abreviation} onChange={e => setData('Abreviation', e.target.value)} className="w-full border rounded px-3 py-2" />
                        {errors.Abreviation && <div className="text-red-600 text-sm mt-1">{errors.Abreviation}</div>}
                    </div>
                    <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
