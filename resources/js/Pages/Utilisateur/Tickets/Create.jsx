import { useForm, Link, usePage } from '@inertiajs/react';
import UtilisateurLayout from '@/Layouts/UtilisateurLayout';
import { route } from 'ziggy-js';

export default function Create() {
    const { categories, priorities, user } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        type: '',
        description: '',
        priorite: '',
        categorie_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('utilisateur.tickets.store'));
    };

    return (
        <UtilisateurLayout user={user}>
            <h2 className="text-xl font-semibold mb-4">Créer un Ticket</h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                {/* Type */}
                <div>
                    <label className="block mb-1 font-medium">Titre</label>
                    <input
                        type="text"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.type && <div className="text-red-600">{errors.type}</div>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="w-full border rounded p-2"
                        rows="4"
                    />
                    {errors.description && <div className="text-red-600">{errors.description}</div>}
                </div>

                {/* Catégorie */}
                <div>
                    <label className="block mb-1 font-medium">Catégorie</label>
                    <select
                        value={data.categorie_id}
                        onChange={(e) => setData('categorie_id', e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">-- Sélectionner une catégorie --</option>
                        {categories.map((cat) => (
                            <option key={cat.id_cat} value={cat.id_cat}>
                                {cat.nom}
                            </option>
                        ))}
                    </select>
                    {errors.categorie_id && <div className="text-red-600">{errors.categorie_id}</div>}
                </div>

                {/* Priorité */}
                <div>
                    <label className="block mb-1 font-medium">Priorité</label>
                    <select
                        value={data.priorite}
                        onChange={(e) => setData('priorite', e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">-- Sélectionner une priorité --</option>
                        {priorities.map((prio) => (
                            <option key={prio} value={prio}>
                                {prio}
                            </option>
                        ))}
                    </select>
                    {errors.priorite && <div className="text-red-600">{errors.priorite}</div>}
                </div>

                {/* Boutons */}
                <div className="flex justify-between mt-6">
                    <Link
                        href={route('utilisateur.dashboard')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Annuler
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Créer
                    </button>
                </div>
            </form>
        </UtilisateurLayout>
    );
}
