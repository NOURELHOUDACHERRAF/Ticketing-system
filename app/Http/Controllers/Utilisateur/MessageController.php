<?php

namespace App\Http\Controllers\Utilisateur;
use App\Enums\NotificationType;
use App\Http\Controllers\Controller;
use App\Models\MessageTicket;
use App\Models\Historique;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Enums\ActorType;

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

        // Send notification to the agent when user sends a message
      if ($ticket->agent_id) {
      Notification::create([
        'destinataire_id' => $ticket->agent_id,
        'type_destinataire' => ActorType::AGENT, 
        'type' => NotificationType::NOUVEAU_MESSAGE,
        'titre' => 'Nouveau message sur le ticket #' . $ticket->numero_ticket,
        'ticket_id' => $ticket->id_ticket,
        'message_id' => $message->id_message,
    ]);
}

        return back();
    }
}
