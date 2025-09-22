<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\Historique;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoriqueController extends Controller
{
    public function index()
    {
        $user = Auth::guard('utilisateur')->user();

        $historiques = Historique::where('utilisateur_id', $user->id_utilisateur)
            ->with('ticket')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Utilisateur/Historiques/Index', [
            'historiques' => $historiques,
            'user' => $user,
        ]);
    }
}
