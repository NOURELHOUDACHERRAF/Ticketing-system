<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Categorie;
use App\Enums\TicketStatus;
use App\Enums\TicketPriority;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $tickets = $user->tickets()
            ->with(['agent', 'categorie', 'superviseur'])
            ->orderBy('date_creation', 'desc')
            ->paginate(15);

        return response()->json([
            'message' => 'User Tickets',
            'tickets' => $tickets,
        ]);
    }

   public function create()
{
    $categories = Categorie::orderBy('nom')->get();
    
    return Inertia::render('Utilisateur/Tickets/Create', [
        'user' => auth('utilisateur')->user(),
        'categories' => $categories,
        'priorities' => TicketPriority::cases(),
    ]);
}

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|string|max:200',
            'description' => 'required|string',
            'priorite' => 'required|in:' . implode(',', array_column(TicketPriority::cases(), 'value')),
            'categorie_id' => 'nullable|exists:categorie,id_cat',
        ]);

        $validated['utilisateur_id'] = Auth::id();
        $validated['numero_ticket'] = 'TK-' . date('Ymd') . '-' . str_pad(Ticket::count() + 1, 4, '0', STR_PAD_LEFT);
        $validated['statut'] = TicketStatus::NOUVEAU;

        $ticket = Ticket::create($validated);

        return redirect()->route('utilisateur.dashboard')
    ->with('success', 'Ticket créé avec succès!');
    }

    public function show(Ticket $ticket)
    {
        // Ensure user can only see their own tickets
        if ($ticket->utilisateur_id !== Auth::id()) {
            abort(403, 'Vous ne pouvez voir que vos propres tickets.');
        }

        $ticket->load([
            'agent', 'categorie', 'superviseur', 
            'messages', 'historiques'
        ]);

        return response()->json([
            'message' => 'Ticket Details',
            'ticket' => $ticket,
        ]);
    }
}