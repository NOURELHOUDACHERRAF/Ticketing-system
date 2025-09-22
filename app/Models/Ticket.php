<?php

namespace App\Models;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'ticket';
    protected $primaryKey = 'id_ticket';

    protected $fillable = [
        'numero_ticket', 'type', 'description', 'statut', 'priorite',
        'date_creation', 'date_modification', 'date_resolution',
        'utilisateur_id', 'agent_id', 'superviseur_id', 'categorie_id', 'motif'
    ];

    protected $casts = [
        'statut' => TicketStatus::class,
        'priorite' => TicketPriority::class,
        'date_creation' => 'datetime',
        'date_modification' => 'datetime',
        'date_resolution' => 'datetime',
    ];

    // RELATIONSHIPS
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id', 'id_utilisateur');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id', 'id_agent');
    }

    public function superviseur()
    {
        return $this->belongsTo(Agent::class, 'superviseur_id', 'id_agent');
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id_cat');
    }

    public function historiques()
    {
        return $this->hasMany(Historique::class, 'ticket_id', 'id_ticket');
    }

    public function messages()
    {
        return $this->hasMany(MessageTicket::class, 'ticket_id', 'id_ticket');
    }
}