<?php

namespace App\Models;

use App\Enums\ActorType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageTicket extends Model
{
    use HasFactory;

    protected $table = 'message_ticket';
    protected $primaryKey = 'id_message';

    protected $fillable = [
        'ticket_id', 'expediteur_id', 'type_expediteur', 'contenu',
        'date_envoi', 'piece_jointe'
    ];

    protected $casts = [
        'type_expediteur' => ActorType::class,
        'date_envoi' => 'datetime',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id_ticket');
    }
}
