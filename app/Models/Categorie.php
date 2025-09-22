<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $table = 'categorie';
    protected $primaryKey = 'id_cat';

    protected $fillable = [
        'Nom', 'description', 'id_grp'
    ];

    public function groupe()
    {
        return $this->belongsTo(Groupe::class, 'id_grp', 'id_groupe');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'categorie_id', 'id_cat');
    }
}
