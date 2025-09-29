<?php

namespace App\Models;

use App\Enums\ActorType;
use App\Enums\NotificationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notification';
    protected $primaryKey = 'id_notification';

    protected $fillable = [
        'destinataire_id', 'type_destinataire', 'type', 'titre', 'ticket_id', 'message_id'
    ];

    protected $casts = [
        'type_destinataire' => ActorType::class,
        'type' => NotificationType::class,
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id_ticket');
    }

    public function message()
    {
        return $this->belongsTo(MessageTicket::class, 'message_id', 'id_message');
    }
}
