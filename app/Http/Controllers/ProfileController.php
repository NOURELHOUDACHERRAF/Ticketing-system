<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    // Affichage du profil
    public function edit(Request $request)
    {
        $user = $request->user();

        // If the logged-in user is an admin → show EditAdmin
        if (auth('admin')->check()) {
            return Inertia::render('Profile/EditAdmin', [
                'auth' => ['user' => $user],
                'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
                'status' => session('status'),
            ]);
        }

        // Default → show utilisateur profile
        return Inertia::render('Profile/Show', [
            'auth' => [
                'user' => [
                    'id_utilisateur'   => $user->id_utilisateur,
                    'nom'              => $user->nom,
                    'prenom'           => $user->prenom,
                    'login'            => $user->login,
                    'email'            => $user->email,
                    'telephone'        => $user->telephone,
                    'date_activation'  => $user->date_activation,
                    'date_expiration'  => $user->date_expiration,
                    'actif'            => $user->actif,
                    'unit_org'         => $user->Unit_org,
                    'cree_par'         => $user->cree_par,
                ]
            ]
        ]);
    }

    // Mise à jour → seul téléphone modifiable
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'telephone' => ['nullable', 'string', 'max:20'],
        ]);

        $user->update([
            'telephone' => $validated['telephone'],
        ]);

        return back()->with('success', 'Téléphone mis à jour avec succès.');
    }
}
