<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
   public function run(): void
{
    $this->call([
        AdminSeeder::class,
        UniteOrgSeeder::class,      // unités d’abord
        GroupeSeeder::class,        // ensuite groupes
        AgentSeeder::class,         // puis agents
        UtilisateurSeeder::class,   // ensuite utilisateurs
        CategorieSeeder::class,     // ensuite catégories
        TicketSeeder::class,        // enfin tickets
    ]);
}

}