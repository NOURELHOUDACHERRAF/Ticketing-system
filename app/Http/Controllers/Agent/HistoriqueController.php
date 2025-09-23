<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Historique;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoriqueController extends Controller
{
    public function index()
    {
        $user = Auth::guard('agent')->user();

        $historiques = Historique::where('agent_id', $user->id_agent)
            ->with('ticket')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Agent/Historiques/Index', [
            'historiques' => $historiques,
            'user' => $user,
        ]);
    }
}
