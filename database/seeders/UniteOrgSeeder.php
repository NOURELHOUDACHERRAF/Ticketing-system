<?php

namespace Database\Seeders;

use App\Models\UniteOrg;
use Illuminate\Database\Seeder;

class UniteOrgSeeder extends Seeder
{
    public function run(): void
    {
        $units = [
            ['Num' => 1, 'nom' => 'Direction Générale', 'Abreviation' => 'DG'],
            ['Num' => 2, 'nom' => 'Direction Informatique', 'Abreviation' => 'DI'],
            ['Num' => 3, 'nom' => 'Direction des Ressources Humaines', 'Abreviation' => 'DRH'],
            ['Num' => 4, 'nom' => 'Direction Financière', 'Abreviation' => 'DF'],
            ['Num' => 5, 'nom' => 'Service Comptabilité', 'Abreviation' => 'COMPTA'],
            ['Num' => 6, 'nom' => 'Service Marketing', 'Abreviation' => 'MKT'],
        ];

        foreach ($units as $unit) {
            UniteOrg::create($unit);
        }
    }
}