<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Categorie;
use App\Models\MessageTicket;
use App\Models\Notification;
use App\Enums\ActorType;
use App\Enums\NotificationType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\ActionType; 
use App\Models\Historique;
use App\Enums\TicketStatus;
use Illuminate\Support\Facades\Auth;
class TicketController extends Controller
{
    public function index(): Response
    {
        $agent = auth('agent')->user();
        
        // Get unassigned tickets for this agent's group (including help requested)
        $unassignedTickets = Ticket::query()
            ->whereIn('statut', ['NOUVEAU', 'DEMANDE_AIDE'])
            ->whereNull('agent_id')
            ->whereHas('categorie', function ($query) use ($agent) {
                $query->where('id_grp', $agent->groupe);
            })
            ->with(['utilisateur', 'categorie'])
            ->orderBy('date_creation', 'desc')
            ->paginate(10);

        // Get tickets assigned to this agent
        $assignedTickets = Ticket::query()
            ->where('agent_id', $agent->id_agent)
            ->with(['utilisateur', 'categorie'])
            ->orderBy('date_creation', 'desc')
            ->paginate(10);

        // Get tickets supervised by this agent (if supervisor)
        $supervisedTickets = collect();
        if ($agent->est_superviseur) {
            $supervisedTickets = Ticket::query()
                ->whereHas('categorie.groupe', function ($query) use ($agent) {
                    $query->where('superviseur_id', $agent->id_agent);
                })
                ->where('agent_id', '!=', $agent->id_agent) // Exclude own assigned tickets
                ->with(['utilisateur', 'categorie', 'agent'])
                ->orderBy('date_creation', 'desc')
                ->paginate(10);
        }

        // Get group agents for supervisor assignment
        $groupAgents = \App\Models\Agent::where('groupe', $agent->groupe)
            ->where('id_agent', '!=', $agent->id_agent)
            ->get(['id_agent', 'nom', 'prenom']);

        return Inertia::render('Agent/Tickets/Index', [
            'unassignedTickets' => $unassignedTickets,
            'assignedTickets' => $assignedTickets,
            'supervisedTickets' => $supervisedTickets,
            'agent' => $agent,
            'groupAgents' => $groupAgents,
        ]);
    }

    public function show(Ticket $ticket): Response
    {
        $agent = auth('agent')->user();
        
        // Check if agent can access this ticket
        $canAccess = false;
        
        // Agent is assigned to this ticket
        if ($ticket->agent_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        // Agent is supervisor of the group that handles this ticket
        if ($agent->est_superviseur && $ticket->categorie?->groupe?->superviseur_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        // Agent's group matches ticket category (for unassigned tickets)
        if (!$canAccess && in_array($ticket->statut, ['NOUVEAU','DEMANDE_AIDE'], true) && $ticket->agent_id === null) {
            if (($ticket->categorie?->id_grp ?? null) === $agent->groupe) {
                $canAccess = true;
            }
        }
        
        if (!$canAccess) {
            abort(403, 'You can only access tickets assigned to you, tickets you supervise, or unassigned tickets from your group.');
        }

        $ticket->load(['utilisateur', 'categorie', 'agent', 'messages', 'historiques']);

        return Inertia::render('Agent/Tickets/Show', [
            'ticket' => $ticket,
            'agent' => $agent,
        ]);
    }

  public function assign(Request $request, Ticket $ticket)
    {
        $agent = auth('agent')->user();
        
        // Check if agent can assign this ticket (category must belong to agent's group)
        if (($ticket->categorie?->id_grp ?? null) !== $agent->groupe) {
            return back()->withErrors(['error' => 'You can only assign tickets from your group.']);
        }

        if ($ticket->agent_id !== null) {
            return back()->withErrors(['error' => 'This ticket is already assigned.']);
        }

        $ticket->update([
            'agent_id' => $agent->id_agent,
            'statut' => 'EN_COURS',
        ]);

        // Create history entry
        $ticket->historiques()->create([
            'agent_id' => $agent->id_agent,
            'action' => 'Ticket assigned',
            'commentaire' => 'Ticket assigned to agent',
            'type_action' => 'ASSIGNATION',
        ]);

        return back()->with('success', 'Ticket assigned successfully.');
    }

    public function sendMessage(Request $request, Ticket $ticket)
    {
        $agent = auth('agent')->user();
        
        // Check if agent can access this ticket (same logic as show method)
        $canAccess = false;
        
        if ($ticket->agent_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        if ($agent->est_superviseur && $ticket->categorie?->groupe?->superviseur_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        if (!$canAccess && in_array($ticket->statut, ['NOUVEAU','DEMANDE_AIDE'], true) && $ticket->agent_id === null) {
            if (($ticket->categorie?->id_grp ?? null) === $agent->groupe) {
                $canAccess = true;
            }
        }
        
        if (!$canAccess) {
            return back()->withErrors(['error' => 'You can only send messages to tickets you have access to.']);
        }

        $request->validate([
            'contenu' => 'required|string|max:1000',
            'piece_jointe' => 'nullable|file|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('piece_jointe')) {
            $path = $request->file('piece_jointe')->store('messages', 'public');
        }

        // Create message
        $message = MessageTicket::create([
            'ticket_id' => $ticket->id_ticket,
            'expediteur_id' => $agent->id_agent,
            'type_expediteur' => ActorType::AGENT,
            'contenu' => $request->contenu,
            'piece_jointe' => $path,
        ]);

        // Create notification for the user who created the ticket
        if ($ticket->utilisateur_id) {
            Notification::create([
                'destinataire_id' => $ticket->utilisateur_id,
                'type_destinataire' => ActorType::UTILISATEUR,
                'type' => NotificationType::NOUVEAU_MESSAGE,
                'titre' => 'New message on ticket #' . $ticket->numero_ticket,
                'ticket_id' => $ticket->id_ticket,
                'message_id' => $message->id_message,
            ]);
        }


        return back()->with('success', 'Message sent successfully.');
    }

    public function requestHelp(Request $request, Ticket $ticket)
    {
        $agent = auth('agent')->user();
        
        // Check if agent can access this ticket (same logic as show method)
        $canAccess = false;
        
        if ($ticket->agent_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        if ($agent->est_superviseur && $ticket->categorie?->groupe?->superviseur_id === $agent->id_agent) {
            $canAccess = true;
        }
        
        if (!$canAccess && in_array($ticket->statut, ['NOUVEAU','DEMANDE_AIDE'], true) && $ticket->agent_id === null) {
            if (($ticket->categorie?->id_grp ?? null) === $agent->groupe) {
                $canAccess = true;
            }
        }
        
        if (!$canAccess) {
            return back()->withErrors(['error' => 'You can only request help for tickets you have access to.']);
        }

        // Only assigned agents can request help
        if ($ticket->agent_id !== $agent->id_agent) {
            return back()->withErrors(['error' => 'Only the assigned agent can request help for this ticket.']);
        }

        $request->validate([
            'commentaire' => 'nullable|string|max:500',
        ]);

        // Update ticket status to DEMANDE_AIDE and remove agent assignment
        $ticket->update([
            'statut' => 'DEMANDE_AIDE',
            'agent_id' => null,
        ]);

        // Create history entry
        $ticket->historiques()->create([
            'agent_id' => $agent->id_agent,
            'action' => 'Help requested',
            'commentaire' => $request->commentaire ?: 'Agent requested help with this ticket',
            'type_action' => 'DEMANDE_AIDE',
        ]);

        // Create notification for other agents in the group
        $groupAgents = \App\Models\Agent::where('groupe', $agent->groupe)
            ->where('id_agent', '!=', $agent->id_agent)
            ->get();

        foreach ($groupAgents as $groupAgent) {
            Notification::create([
                'destinataire_id' => $groupAgent->id_agent,
                'type_destinataire' => ActorType::AGENT,
                'type' => NotificationType::DEMANDE_AIDE,
                'titre' => 'Help requested for ticket #' . $ticket->numero_ticket,
                'ticket_id' => $ticket->id_ticket,
            ]);
        }

        // Also notify the supervisor if different from the agent
        if ($agent->groupeRelation?->superviseur_id && $agent->groupeRelation->superviseur_id !== $agent->id_agent) {
            Notification::create([
                'destinataire_id' => $agent->groupeRelation->superviseur_id,
                'type_destinataire' => ActorType::SUPERVISEUR,
                'type' => NotificationType::DEMANDE_AIDE,
                'titre' => 'Help requested for ticket #' . $ticket->numero_ticket,
                'ticket_id' => $ticket->id_ticket,
            ]);
        }

        return back()->with('success', 'Help requested successfully. Other agents in your group have been notified.');
    }

      public function resolve(Ticket $ticket)
{
    $agentId = Auth::id(); // récupère l’agent connecté

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

    return back()->with('success', 'Le ticket a été marqué comme résolu.');
}

    public function assignToAgent(Request $request, Ticket $ticket)
    {
        $supervisor = auth('agent')->user();
        
        // Check if supervisor can assign this ticket
        if (!$supervisor->est_superviseur) {
            return back()->withErrors(['error' => 'Only supervisors can assign tickets to agents.']);
        }
        
        // Check if ticket belongs to supervisor's group
        if (($ticket->categorie?->id_grp ?? null) !== $supervisor->groupe) {
            return back()->withErrors(['error' => 'You can only assign tickets from your group.']);
        }
        
        // Check if ticket is unassigned
        if ($ticket->agent_id !== null) {
            return back()->withErrors(['error' => 'This ticket is already assigned.']);
        }
        
        $request->validate([
            'agent_id' => 'required|exists:agent,id_agent',
        ]);
        
        $agentId = $request->agent_id;
        
        // Verify the agent belongs to the supervisor's group
        $agent = \App\Models\Agent::where('id_agent', $agentId)
            ->where('groupe', $supervisor->groupe)
            ->first();
            
        if (!$agent) {
            return back()->withErrors(['error' => 'You can only assign tickets to agents in your group.']);
        }
        
        // Assign ticket
        $ticket->update([
            'agent_id' => $agentId,
            'statut' => 'EN_COURS',
        ]);
        
        // Create history entry
        $ticket->historiques()->create([
            'agent_id' => $supervisor->id_agent,
            'action' => 'Ticket assigned by supervisor',
            'commentaire' => "Ticket assigned to {$agent->nom} {$agent->prenom} by supervisor",
            'type_action' => ActionType::ASSIGNATION,
        ]);
        
        // Notify the assigned agent
        Notification::create([
            'destinataire_id' => $agentId,
            'type_destinataire' => ActorType::AGENT,
            'type' => NotificationType::TICKET_ASSIGNE,
            'titre' => 'New ticket assigned to you',
            'ticket_id' => $ticket->id_ticket,
        ]);
        
        return back()->with('success', "Ticket assigned to {$agent->nom} {$agent->prenom} successfully.");
    }
}
