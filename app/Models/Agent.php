<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $table = 'agent';
    protected $primaryKey = 'id_agent';

    protected $fillable = [
        'login', 'password', 'nom', 'prenom', 'email', 'telephone', 'groupe',
        'date_activation', 'date_expiration', 'cree_par', 'est_superviseur'
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'est_superviseur' => 'boolean',
        'date_activation' => 'datetime',
        'date_expiration' => 'datetime',
    ];

    public function groupeRelation()
    {
        return $this->belongsTo(Groupe::class, 'groupe', 'id_groupe');
    }

    public function createdBy()
    {
        return $this->belongsTo(Admin::class, 'cree_par', 'id_admin');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'agent_id', 'id_agent');
    }

    public function ticketsSupervises()
    {
        return $this->hasMany(Ticket::class, 'superviseur_id', 'id_agent');
    }
}
