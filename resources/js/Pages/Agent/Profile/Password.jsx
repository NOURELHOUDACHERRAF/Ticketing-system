import AgentLayout from '@/Headers/AgentLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Password({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('agent.profile.password.update'));
  };

  return (
    <AgentLayout>
      <Head title="Changer le mot de passe" />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Changer le mot de passe</h1>
          <p className="text-gray-600">Définissez un mot de passe sécurisé.</p>
        </div>

        <form onSubmit={submit} className="bg-white border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mot de passe actuel</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} />
            {errors.current_password && <p className="text-sm text-red-600 mt-1">{errors.current_password}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nouveau mot de passe</label>
              <input type="password" className="w-full border rounded px-3 py-2" value={data.password} onChange={(e) => setData('password', e.target.value)} />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirmer le mot de passe</label>
              <input type="password" className="w-full border rounded px-3 py-2" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Enregistrer</button>
          </div>
        </form>
      </div>
    </AgentLayout>
  );
}


