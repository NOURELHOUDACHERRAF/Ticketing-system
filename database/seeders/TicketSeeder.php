<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\Utilisateur;
use App\Models\Categorie;
use App\Enums\TicketStatus;
use App\Enums\TicketPriority;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        $user = Utilisateur::first();
        $categorie = Categorie::first();

        if ($user && $categorie) {
            Ticket::create([
                'numero_ticket' => 'TCK-001',
                'type' => 'Incident',
                'description' => 'Impossible de se connecter à la plateforme.',
                'statut' => TicketStatus::NOUVEAU,
                'priorite' => TicketPriority::NORMALE,
                'date_creation' => now(),
                'utilisateur_id' => $user->id_utilisateur,
                'categorie_id' => $categorie->id_cat,
                'motif' => 'Test initial',
            ]);
        }
    }
}
