import { useForm } from "@inertiajs/react";
import { Lock, Mail } from "lucide-react";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token,
    email,
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("password.update"));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
          <b className="text-2xl font-bold text-blue-600">SONELDESK</b>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6">
          Nouveau mot de passe
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={data.email}
              readOnly
              className="w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirmation */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? "Mise à jour..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
}
