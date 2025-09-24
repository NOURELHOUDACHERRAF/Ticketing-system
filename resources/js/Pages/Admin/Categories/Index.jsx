import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories }) {
    const { flash } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Categories" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <Link href={route('admin.categories.create')} className="px-3 py-2 bg-blue-600 text-white rounded">New Category</Link>
                </div>
                {flash?.success && (<div className="mb-4 text-green-700">{flash.success}</div>)}
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.map(c => (
                            <tr key={c.id_cat} className="border-t">
                                <td className="py-2">{c.Nom}</td>
                                <td className="py-2">{c.description || '-'}</td>
                                <td className="py-2">{c.groupe?.nom}</td>
                                <td className="py-2 text-right">
                                    <Link href={route('admin.categories.edit', c.id_cat)} className="text-blue-600">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
