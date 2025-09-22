<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Utilisateur\Auth\LogoutController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\Admin\AgentController;
use App\Http\Controllers\Admin\UtilisateurController as AdminUserController;
use App\Http\Controllers\Utilisateur\DashboardController as UtilisateurDashboardController;
use App\Http\Controllers\Utilisateur\TicketController as UtilisateurTicketController;
use App\Http\Controllers\Utilisateur\NotificationController;
use App\Http\Controllers\Utilisateur\HistoriqueController;
use App\Http\Controllers\Utilisateur\MessageController;

Route::get('/', function () {
    return response()->json(['message' => 'Ticketing System API']);
});

Route::get('/dashboard', function () {
    if ($admin = auth('admin')->user()) {
        return redirect()->route('admin.home');
    } elseif ($user = auth('utilisateur')->user()) {
        return redirect()->route('utilisateur.dashboard');
    }

    return redirect()->route('login');
})->name('dashboard');

// ----------- Admin routes -----------
Route::prefix('admin')->name('admin.')->middleware('auth:admin')->group(function () {
    Route::get('/dashboard', function () {
        $admin = auth('admin')->user();
        return Inertia::render('Admin/Dashboard', [
            'auth' => ['user' => $admin],
        ]);
    })->name('home');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::resource('units', UnitController::class)->except(['show']);
    Route::resource('groups', GroupController::class)->except(['show']);
    Route::resource('agents', AgentController::class)->except(['show']);
    Route::resource('users', AdminUserController::class)->except(['show']);

    Route::post('agents/{agent}/assign-group', [AgentController::class, 'assignGroup'])->name('agents.assignGroup');
    Route::post('groups/{group}/set-supervisor', [GroupController::class, 'setSupervisor'])->name('groups.setSupervisor');
    Route::post('users/{user}/assign-unit', [AdminUserController::class, 'assignUnit'])->name('users.assignUnit');
});

// ----------- Utilisateur routes -----------
Route::prefix('utilisateur')->name('utilisateur.')->middleware('auth:utilisateur')->group(function () {
    Route::get('/dashboard', [UtilisateurDashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/tickets/create', [UtilisateurTicketController::class, 'create'])
        ->name('tickets.create');
    Route::post('/tickets', [UtilisateurTicketController::class, 'store'])
        ->name('tickets.store');
    Route::get('/tickets/{ticket}', [UtilisateurTicketController::class, 'show'])
        ->name('tickets.show');

    Route::post('/tickets/{ticket}/messages', [MessageController::class, 'store'])
        ->name('tickets.messages.store');

    Route::post('/tickets/{ticket}/accept-solution', [UtilisateurTicketController::class, 'acceptSolution'])
        ->name('tickets.acceptSolution');

    Route::post('/tickets/{ticket}/refuse-solution', [UtilisateurTicketController::class, 'refuseSolution'])
        ->name('tickets.refuseSolution');

    Route::get('/notifications', [NotificationController::class, 'index'])
        ->name('notifications.index');
    Route::get('/historiques', [HistoriqueController::class, 'index'])
        ->name('historiques.index');

    Route::post('/logout', [LogoutController::class, '__invoke'])->name('logout');
});

require __DIR__ . '/auth.php';
