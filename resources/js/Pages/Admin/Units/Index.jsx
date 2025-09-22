import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ units }) {
    const { flash } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Units" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Units</h1>
                    <Link href={route('admin.units.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New Unit</Link>
                </div>
                {flash?.success && (<div className="mb-4 text-green-700">{flash.success}</div>)}
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Num</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Abbreviation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.data.map(u => (
                            <tr key={u.Num} className="border-t">
                                <td className="py-2">{u.Num}</td>
                                <td className="py-2">{u.nom}</td>
                                <td className="py-2">{u.Abreviation ?? '-'}</td>
                                <td className="py-2 text-right">
                                    <Link href={route('admin.units.edit', u.Num)} className="text-blue-600">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
