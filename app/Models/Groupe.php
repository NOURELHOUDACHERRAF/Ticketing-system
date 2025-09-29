<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;

    protected $table = 'groupe';
    protected $primaryKey = 'id_groupe';

    protected $fillable = [
        'nom', 'domaine', 'superviseur_id', 'cree_par'
    ];

    public function superviseur()
    {
        return $this->belongsTo(Agent::class, 'superviseur_id', 'id_agent');
    }

    public function adminCreateur()
    {
        return $this->belongsTo(Admin::class, 'cree_par', 'id_admin');
    }

    public function agents()
    {
        return $this->hasMany(Agent::class, 'groupe', 'id_groupe');
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class, 'id_grp', 'id_groupe');
    }
}
