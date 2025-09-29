<?php

namespace Database\Seeders;

use App\Models\Utilisateur;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UtilisateurSeeder extends Seeder
{
    public function run(): void
    {
        $adminId = Admin::first()->id_admin;

        $users = [
            [
                'nom' => 'Dubois',
                'prenom' => 'Marie',
                'login' => 'mdubois',
                'password' => Hash::make('user123'),
                'email' => 'marie.dubois@example.com',
                'telephone' => '0123456780',
                'Unit_org' => null, // Set to null or make sure you have unite_org table
                'cree_par' => $adminId,
                'actif' => true,
                'date_activation' => now(),
            ],
            [
                'nom' => 'Martin',
                'prenom' => 'Pierre',
                'login' => 'pmartin',
                'password' => Hash::make('user123'),
                'email' => 'pierre.martin@example.com',
                'telephone' => '0123456781',
                'Unit_org' => null,
                'cree_par' => $adminId,
                'actif' => true,
                'date_activation' => now(),
            ],
            [
                'nom' => 'Leclerc',
                'prenom' => 'Sophie',
                'login' => 'sleclerc',
                'password' => Hash::make('user123'),
                'email' => 'sophie.leclerc@example.com',
                'telephone' => '0123456782',
                'Unit_org' => null,
                'cree_par' => $adminId,
                'actif' => true,
                'date_activation' => now(),
            ],
            [
                'nom' => 'Rousseau',
                'prenom' => 'Jean',
                'login' => 'jrousseau',
                'password' => Hash::make('user123'),
                'email' => 'jean.rousseau@example.com',
                'telephone' => '0123456783',
                'Unit_org' => null,
                'cree_par' => $adminId,
                'actif' => true,
                'date_activation' => now(),
            ],
        ];

        foreach ($users as $user) {
            Utilisateur::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}