<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::firstOrCreate(
            ['login' => 'admin'],
            [
                'nom' => 'Admin',
                'prenom' => 'System',
                'login' => 'admin',
                'password' => Hash::make('admin123'),
                'email' => 'admin@example.com',
                'telephone' => null,
            ]
        );

        // Create another admin for testing
        Admin::firstOrCreate(
            ['login' => 'superadmin'],
            [
                'nom' => 'Super',
                'prenom' => 'Administrator',
                'login' => 'superadmin',
                'password' => Hash::make('super123'),
                'email' => 'superadmin@example.com',
                'telephone' => '0123456789',
            ]
        );
    }
}