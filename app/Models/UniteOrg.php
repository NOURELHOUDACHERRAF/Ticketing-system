<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniteOrg extends Model
{
    use HasFactory;

    protected $table = 'unite_org';
    protected $primaryKey = 'Num';
    public $incrementing = false;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'Num', 'nom', 'Abreviation'
    ];

    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'Unit_org', 'Num');
    }
}
