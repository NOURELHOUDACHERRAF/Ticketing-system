<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Enums\TicketStatus;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth('utilisateur')->user();

        $tickets = $user->tickets()
            ->with(['agent', 'categorie'])
            ->orderBy('date_creation', 'desc')
            ->paginate(10)
            ->through(fn($ticket) => [
                'id_ticket' => $ticket->id_ticket,
                'numero_ticket' => $ticket->numero_ticket,
                'type' => $ticket->type,
                'description' => $ticket->description,
                'statut' => $ticket->statut->value,
                'priorite' => $ticket->priorite->value,
                'agent' => $ticket->agent?->nom,
                'categorie' => $ticket->categorie?->nom,
                'date_creation' => $ticket->date_creation->format('Y-m-d H:i'),
            ]);

        $ticketStats = [
            'total'    => $user->tickets()->count(),
            'nouveau'  => $user->tickets()->where('statut', TicketStatus::NOUVEAU)->count(),
            'en_cours' => $user->tickets()->where('statut', TicketStatus::EN_COURS)->count(),
            'resolu'   => $user->tickets()->where('statut', TicketStatus::RESOLU)->count(),
        ];

        return Inertia::render('Utilisateur/Dashboard', [
            'user' => $user,
            'tickets' => $tickets,
            'ticketStats' => $ticketStats,
        ]);
    }
}
