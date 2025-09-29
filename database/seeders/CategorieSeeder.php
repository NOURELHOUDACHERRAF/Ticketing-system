<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Groupe;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        $groupes = Groupe::all();

        $categories = [
            // IT Categories
            [
                'Nom' => 'Problème Matériel',
                'description' => 'Problèmes liés au matériel informatique',
                'id_grp' => $groupes->where('nom', 'Support Informatique')->first()->id_groupe,
            ],
            [
                'Nom' => 'Problème Logiciel',
                'description' => 'Problèmes liés aux logiciels',
                'id_grp' => $groupes->where('nom', 'Support Informatique')->first()->id_groupe,
            ],
            [
                'Nom' => 'Accès Réseau',
                'description' => 'Problèmes de connexion réseau',
                'id_grp' => $groupes->where('nom', 'Support Informatique')->first()->id_groupe,
            ],
            // HR Categories
            [
                'Nom' => 'Congés et Absences',
                'description' => 'Demandes liées aux congés',
                'id_grp' => $groupes->where('nom', 'Support RH')->first()->id_groupe,
            ],
            [
                'Nom' => 'Formation',
                'description' => 'Demandes de formation',
                'id_grp' => $groupes->where('nom', 'Support RH')->first()->id_groupe,
            ],
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }
    }
}