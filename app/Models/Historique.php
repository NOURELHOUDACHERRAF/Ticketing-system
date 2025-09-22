<?php

namespace App\Models;

use App\Enums\ActionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historique extends Model
{
    use HasFactory;

    protected $table = 'historique';
    protected $primaryKey = 'id_historique';

    protected $fillable = [
        'ticket_id', 'utilisateur_id', 'agent_id', 'action',
        'date_action', 'commentaire', 'type_action'
    ];

    protected $casts = [
        'type_action' => ActionType::class,
        'date_action' => 'datetime',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id_ticket');
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id', 'id_utilisateur');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id', 'id_agent');
    }
}
