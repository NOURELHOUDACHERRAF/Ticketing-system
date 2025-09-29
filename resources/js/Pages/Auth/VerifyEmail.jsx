import { useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/assets/LOGO.svg" alt="Logo" className="w-12 h-12" />
          <b className="text-2xl font-bold text-blue-600">SONELDESK</b>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4">
          Vérification d’email
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Merci de vérifier votre adresse email en cliquant sur le lien que nous vous avons envoyé.
        </p>

        {status === "verification-link-sent" && (
          <div className="mb-4 text-sm text-green-600 text-center">
            Un nouveau lien de vérification a été envoyé à votre adresse email.
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? "Envoi en cours..." : "Renvoyer le lien"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href={route("logout")} method="post" as="button" className="text-sm text-red-600 hover:underline">
            Déconnexion
          </a>
        </div>
      </div>
    </div>
  );
}
