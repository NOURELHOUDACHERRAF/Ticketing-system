import { useForm } from "@inertiajs/react";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
          <b className="text-2xl font-bold text-blue-600">SONELDESK</b>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6">
          Réinitialiser le mot de passe
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Votre email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? "Envoi en cours..." : "Envoyer le lien"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href={route("login")} className="text-sm text-blue-600 hover:underline">
            Retour à la connexion
          </a>
        </div>
      </div>
    </div>
  );
}
