<?php

return [
   'defaults' => [
    'guard' => 'utilisateur', // ou 'admin' selon ton besoin par défaut
    'passwords' => 'utilisateurs',
],

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'utilisateurs', // plus de multi_users
    ],

    'admin' => [
        'driver' => 'session',
        'provider' => 'admins',
    ],

    'utilisateur' => [
        'driver' => 'session',
        'provider' => 'utilisateurs',
    ],
],

'providers' => [
    'admins' => [
        'driver' => 'eloquent',
        'model' => App\Models\Admin::class,
    ],

    'utilisateurs' => [
        'driver' => 'eloquent',
        'model' => App\Models\Utilisateur::class,
    ],
],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
        
        'utilisateurs' => [
            'provider' => 'utilisateurs',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];