<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\Admin;
use App\Models\Groupe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AgentSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = Admin::first()->id_admin;
        $groupes = Groupe::all();

        $agents = [
            [
                'nom' => 'Dupont',
                'prenom' => 'Nicolas',
                'login' => 'ndupont',
                'password' => Hash::make('agent123'),
                'email' => 'nicolas.dupont@example.com',
                'telephone' => '0123456790',
                'groupe' => $groupes->where('nom', 'Support Informatique')->first()->id_groupe,
                'cree_par' => $adminId,
                'est_superviseur' => true,
                'date_activation' => now(),
            ],
            [
                'nom' => 'Moreau',
                'prenom' => 'Julie',
                'login' => 'jmoreau',
                'password' => Hash::make('agent123'),
                'email' => 'julie.moreau@example.com',
                'telephone' => '0123456791',
                'groupe' => $groupes->where('nom', 'Support Informatique')->first()->id_groupe,
                'cree_par' => $adminId,
                'est_superviseur' => false,
                'date_activation' => now(),
            ],
            [
                'nom' => 'Bernard',
                'prenom' => 'Paul',
                'login' => 'pbernard',
                'password' => Hash::make('agent123'),
                'email' => 'paul.bernard@example.com',
                'telephone' => '0123456792',
                'groupe' => $groupes->where('nom', 'Support RH')->first()->id_groupe,
                'cree_par' => $adminId,
                'est_superviseur' => true,
                'date_activation' => now(),
            ],
        ];

        foreach ($agents as $agent) {
            Agent::create($agent);
        }

        // Set supervisors for groups
        $groups = Groupe::all();
        $groups->where('nom', 'Support Informatique')->first()->update([
            'superviseur_id' => Agent::where('login', 'ndupont')->first()->id_agent
        ]);
        $groups->where('nom', 'Support RH')->first()->update([
            'superviseur_id' => Agent::where('login', 'pbernard')->first()->id_agent
        ]);
    }
}
