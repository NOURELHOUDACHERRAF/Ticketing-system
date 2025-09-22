import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ units }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        prenom: '',
        login: '',
        password: '',
        email: '',
        telephone: '',
        Unit_org: '',
        actif: true,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="New User" />
            <div className="p-6 max-w-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Create User</h1>
                    <Link href={route('admin.users.index')} className="text-blue-600">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">First name</label>
                            <input value={data.prenom} onChange={e => setData('prenom', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.prenom && <div className="text-red-600 text-sm mt-1">{errors.prenom}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Last name</label>
                            <input value={data.nom} onChange={e => setData('nom', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Login</label>
                            <input value={data.login} onChange={e => setData('login', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.login && <div className="text-red-600 text-sm mt-1">{errors.login}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Phone</label>
                            <input value={data.telephone} onChange={e => setData('telephone', e.target.value)} className="w-full border rounded px-3 py-2" />
                            {errors.telephone && <div className="text-red-600 text-sm mt-1">{errors.telephone}</div>}
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm mb-1">Unit</label>
                            <select value={data.Unit_org} onChange={e => setData('Unit_org', e.target.value)} className="w-full border rounded px-3 py-2">
                                <option value="">None</option>
                                {units.map(u => (
                                    <option key={u.Num} value={u.Num}>{u.nom}</option>
                                ))}
                            </select>
                            {errors.Unit_org && <div className="text-red-600 text-sm mt-1">{errors.Unit_org}</div>}
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <input id="actif" type="checkbox" checked={data.actif} onChange={e => setData('actif', e.target.checked)} />
                            <label htmlFor="actif">Active</label>
                        </div>
                    </div>
                    <button disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
