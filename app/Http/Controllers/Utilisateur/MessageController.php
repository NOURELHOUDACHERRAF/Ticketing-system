<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\MessageTicket;
use App\Models\Historique;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request, $ticketId)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $ticket = Ticket::findOrFail($ticketId);

        // Création du message
        $message = MessageTicket::create([
            'ticket_id' => $ticket->id_ticket,
            'expediteur_id' => Auth::guard('utilisateur')->id(),
            'type_expediteur' => 'UTILISATEUR',
            'contenu' => $request->message,
            'date_envoi' => now(),
        ]);

        return back();
    }
}
