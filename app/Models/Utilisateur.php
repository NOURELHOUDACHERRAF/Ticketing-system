<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'utilisateur';
    protected $primaryKey = 'id_utilisateur';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nom', 'prenom', 'login', 'password', 'email', 'telephone',
        'date_activation', 'date_expiration', 'actif', 'Unit_org', 'cree_par'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'date_activation' => 'datetime',
        'date_expiration' => 'datetime',
        'password' => 'hashed',
    ];

    // Helper method for checking if user is active
    public function isActive()
    {
        if (!$this->actif) return false;
        if ($this->date_expiration && $this->date_expiration->isPast()) return false;
        return true;
    }

    // Relationships
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'utilisateur_id', 'id_utilisateur');
    }

    public function adminCreateur()
    {
        return $this->belongsTo(Admin::class, 'cree_par', 'id_admin');
    }

    public function uniteOrganisationnelle()
{
    return $this->belongsTo(UniteOrg::class, 'Unit_org', 'id_unite_org');
}
}
