import { Head } from '@inertiajs/react';
import AgentLayout from '@/Headers/AgentLayout';

export default function Profile({ auth }) {
  const agent = auth.user;

  return (
    <AgentLayout>
      <Head title="Profil Agent" />
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mon profil</h1>
          <div className="flex gap-2">
            <a href={route('agent.profile.edit')} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Modifier</a>
            <a href={route('agent.profile.password')} className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Changer mot de passe</a>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 space-y-4">
          <div>
            <div className="text-sm text-gray-500">Nom complet</div>
            <div className="text-gray-900">{agent.nom} {agent.prenom}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="text-gray-900">{agent.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Téléphone</div>
            <div className="text-gray-900">{agent.telephone || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Groupe</div>
            <div className="text-gray-900">{agent.groupe_relation?.nom || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Rôle</div>
            <div className="text-gray-900">{agent.est_superviseur ? 'Superviseur' : 'Agent'}</div>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}


