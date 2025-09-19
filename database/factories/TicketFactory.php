<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ticket;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Ticket> */
class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(6),
            'description' => $this->faker->paragraph,
            'statut' => $this->faker->randomElement(['NOUVEAU', 'EN_COURS', 'RESOLU']),
            'date_creation' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
