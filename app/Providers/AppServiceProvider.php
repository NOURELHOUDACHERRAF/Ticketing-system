<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Share the authenticated user for both guards
       Inertia::share([
    'auth' => function () {
        if ($admin = auth('admin')->user()) {
            return ['user' => $admin, 'guard' => 'admin'];
        } elseif ($utilisateur = auth('utilisateur')->user()) {
            return ['user' => $utilisateur, 'guard' => 'utilisateur'];
        }
        return ['user' => null];
    },
]);

    }
}
