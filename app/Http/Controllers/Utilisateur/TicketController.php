<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Categorie;
use App\Models\Historique;
use App\Models\Notification;
use App\Enums\TicketStatus;
use App\Enums\TicketPriority;
use App\Enums\ActorType;
use App\Enums\NotificationType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Enums\ActionType; 
class TicketController extends Controller
{
    public function index()
    {
        $user = Auth::guard('utilisateur')->user();

        $tickets = $user->tickets()
            ->with(['agent', 'categorie', 'superviseur'])
            ->orderBy('date_creation', 'desc')
            ->paginate(15);

        return Inertia::render('Utilisateur/Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function create()
    {
        $categories = Categorie::orderBy('Nom')->get();

        return Inertia::render('Utilisateur/Tickets/Create', [
            'user' => auth('utilisateur')->user(),
            'categories' => $categories,
            'priorities' => TicketPriority::cases(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie_id' => 'required|exists:categorie,id_cat',
            'priorite' => 'required|string',
            'piece_jointe' => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:2048'
        ]);

        $path = null;
        if ($request->hasFile('piece_jointe')) {
            $path = $request->file('piece_jointe')->store('tickets', 'public');
        }

        $ticket = Ticket::create([
            'numero_ticket' => 'TK-'.now()->format('Ymd').'-'.str_pad(Ticket::count()+1, 4, '0', STR_PAD_LEFT),
            'type' => $request->type,
            'description' => $request->description,
            'statut' => TicketStatus::NOUVEAU->value,
            'priorite' => $request->priorite,
            'date_creation' => now(),
            'utilisateur_id' => auth('utilisateur')->id(),
            'categorie_id' => $request->categorie_id,
            'piece_jointe' => $path,
        ]);

        // Historique
        Historique::create([
            'ticket_id' => $ticket->id_ticket,
            'utilisateur_id' => $ticket->utilisateur_id,
            'action' => 'Création du ticket',
            'type_action' => ActionType::CREATION,
            'commentaire' => $ticket->description,
        ]);

        return redirect()->route('utilisateur.dashboard')
            ->with('success', 'Ticket créé avec succès !');
    }

public function show($id)
{
$ticket = Ticket::with([
    'agent',
    'categorie',
    'historiques' => fn($q) => $q->orderBy('date_action', 'asc'),
    'messages.utilisateurAuteur',
    'messages.agentAuteur'
])->findOrFail($id);



    return Inertia::render('Utilisateur/Tickets/Show', [
        'ticket' => $ticket,
    ]);
}


    public function acceptSolution($id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->update(['statut' => 'CLOS']);

        Historique::create([
            'ticket_id' => $ticket->id_ticket,
            'utilisateur_id' => Auth::id(),
            'action' => 'Solution acceptée par l’utilisateur',
            'type_action' => ActionType::FERMETURE, 
            'commentaire' => 'Utilisateur a accepté la solution',
        ]);

        Notification::create([
            'destinataire_id' => $ticket->agent_id,
            'type_destinataire' => 'AGENT',
            'type' => NotificationType::TICKET_CLOS,
            'ticket_id' => $ticket->id_ticket,
        ]);

        return back();
    }

    public function refuseSolution($id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->update(['statut' => 'EN_COURS']);

        Historique::create([
            'ticket_id' => $ticket->id_ticket,
            'utilisateur_id' => Auth::id(),
            'action' => 'Solution refusée par l’utilisateur',
            'type_action' => ActionType::ASSIGNATION,
            'commentaire' => 'Utilisateur a refusé la solution',
        ]);

       Notification::create([
            'destinataire_id' => $ticket->agent_id,
            'type_destinataire' => 'AGENT',
            'type' => NotificationType::SOLUTION_REFUSEE,
            'ticket_id' => $ticket->id_ticket,
        ]);

        return back();
    }

    // ========== Status Management ==========

    // public function assignToAgent(Ticket $ticket, $agentId)
    // {
    //     $ticket->update(['statut' => TicketStatus::EN_COURS->value, 'agent_id' => $agentId]);
    //     Historique::create([
    //         'ticket_id' => $ticket->id_ticket,
    //         'agent_id' => $agentId,
    //         'action' => 'Ticket assigné à un agent',
    //         'type_action' => ActionType::ASSIGNATION,
    //         'commentaire' => 'Ticket assigné à un agent',
            
    //     ]);

    //     // Notify agent
    //     Notification::create([
    //         'destinataire_id' => $agentId,
    //         'type_destinataire' => ActorType::AGENT,
    //         'type' => NotificationType::TICKET_ASSIGNE,
    //         'titre' => 'Nouveau ticket assigné',
    //         'ticket_id' => $ticket->id_ticket,
    //     ]);

    //     // Notify user
    //     Notification::create([
    //         'destinataire_id' => $ticket->utilisateur_id,
    //         'type_destinataire' => ActorType::UTILISATEUR,
    //         'type' => NotificationType::TICKET_ASSIGNE,
    //         'titre' => 'Votre ticket est en cours de traitement',
    //         'ticket_id' => $ticket->id_ticket,
    //     ]);
    // }

    // public function requestHelp(Ticket $ticket, $agentId)
    // {
    //     $ticket->update(['statut' => TicketStatus::DEMANDE_AIDE->value]);

    //     Historique::create([
    //         'ticket_id' => $ticket->id_ticket,
    //         'agent_id' => $agentId,
    //         'action' => 'Demande d’aide envoyée par agent',
    //         'type_action' => ActionType::DEMANDE_AIDE,
    //         'commentaire' => 'Demande d’aide envoyée par agent',
    //     ]);

    //     // Notify superviseur
    //     Notification::create([
    //         'destinataire_id' => $ticket->superviseur_id,
    //         'type_destinataire' => ActorType::SUPERVISEUR,
    //         'type' => NotificationType::DEMANDE_AIDE,
    //         'titre' => 'Un agent demande de l’aide',
    //         'ticket_id' => $ticket->id_ticket,
    //     ]);
    // }

    public function resolve(Ticket $ticket, $agentId)
    {
        $ticket->update(['statut' => TicketStatus::RESOLU->value]);

        Historique::create([
            'ticket_id' => $ticket->id_ticket,
            'agent_id' => $agentId,
            'action' => 'Proposition de solution',
            'type_action' => ActionType::RESOLUTION,
            'commentaire' => 'Proposition de solution',
        ]);

        // Notify user
        Notification::create([
            'destinataire_id' => $ticket->utilisateur_id,
            'type_destinataire' => ActorType::UTILISATEUR,
            'type' => NotificationType::TICKET_RESOLU,
            'titre' => 'Votre ticket a une solution proposée',
            'ticket_id' => $ticket->id_ticket,
        ]);
    }

}
