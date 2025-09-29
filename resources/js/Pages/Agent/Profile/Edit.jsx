import AgentLayout from '@/Headers/AgentLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth }) {
  const agent = auth.user;
  const { data, setData, patch, processing, errors } = useForm({
    nom: agent.nom || '',
    prenom: agent.prenom || '',
    email: agent.email || '',
    telephone: agent.telephone || '',
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('agent.profile.update'));
  };

  return (
    <AgentLayout>
      <Head title="Modifier le profil" />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Modifier le profil</h1>
          <p className="text-gray-600">Mettez à jour vos informations personnelles.</p>
        </div>

        <form onSubmit={submit} className="bg-white border rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nom</label>
              <input className="w-full border rounded px-3 py-2" value={data.nom} onChange={(e) => setData('nom', e.target.value)} />
              {errors.nom && <p className="text-sm text-red-600 mt-1">{errors.nom}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Prénom</label>
              <input className="w-full border rounded px-3 py-2" value={data.prenom} onChange={(e) => setData('prenom', e.target.value)} />
              {errors.prenom && <p className="text-sm text-red-600 mt-1">{errors.prenom}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Téléphone</label>
            <input className="w-full border rounded px-3 py-2" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} />
            {errors.telephone && <p className="text-sm text-red-600 mt-1">{errors.telephone}</p>}
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Enregistrer</button>
          </div>
        </form>
      </div>
    </AgentLayout>
  );
}


