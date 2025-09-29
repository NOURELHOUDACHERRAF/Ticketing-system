<?php

namespace Database\Seeders;

use App\Models\Groupe;
use App\Models\Admin;
use Illuminate\Database\Seeder;

class GroupeSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = Admin::first()->id_admin;

        $groups = [
            [
                'nom' => 'Support Informatique',
                'domaine' => 'IT',
                'cree_par' => $adminId,
            ],
            [
                'nom' => 'Support RH',
                'domaine' => 'Resources Humaines',
                'cree_par' => $adminId,
            ],
            [
                'nom' => 'Support Financier',
                'domaine' => 'Finance',
                'cree_par' => $adminId,
            ],
        ];

        foreach ($groups as $group) {
            Groupe::create($group);
        }
    }
}