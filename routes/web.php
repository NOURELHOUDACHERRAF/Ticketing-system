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
use App\Http\Controllers\Agent\NotificationController as AgentNotificationController;
use App\Http\Controllers\Utilisateur\HistoriqueController;
use App\Http\Controllers\Agent\HistoriqueController as AgentHistoriqueController;
use App\Http\Controllers\Utilisateur\MessageController;
use App\Http\Controllers\Agent\LogoutController as AgentLogoutController;
use App\Http\Controllers\Admin\CategorieController;
use App\Http\Controllers\ProfileController;



Route::get('/', function () {
    return response()->json(['message' => 'Ticketing System API']);
});

Route::get('/dashboard', function () {
    if ($admin = auth('admin')->user()) {
        return redirect()->route('admin.home');
    } elseif ($agent = auth('agent')->user()) {
        return redirect()->route('agent.dashboard');
    } elseif ($user = auth('utilisateur')->user()) {
        return redirect()->route('utilisateur.dashboard');
    }

    return redirect()->route('login');
})->name('dashboard');

// ----------- Admin routes -----------
Route::prefix('admin')->name('admin.')->middleware('auth:admin')->group(function () {
<<<<<<< HEAD
    Route::get('/dashboard', function () {
        $admin = auth('admin')->user();
        return Inertia::render('Admin/Dashboard', [
            'auth' => ['user' => $admin],
=======
   Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



    
    Route::get('/dashboard', function () {
        $admin = auth('admin')->user();
        return Inertia::render('Admin/Dashboard', [
            'auth' => ['user' => $admin], 
>>>>>>> 7a6cee6 (all changes done)
        ]);
    })->name('home');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::resource('units', UnitController::class)->except(['show']);
    Route::resource('groups', GroupController::class)->except(['show']);
    Route::resource('agents', AgentController::class)->except(['show']);
    Route::resource('users', AdminUserController::class)->except(['show']);
<<<<<<< HEAD
    Route::resource('categories', CategorieController::class)->except(['show']);

=======
Route::resource('categories', CategorieController::class)->except(['show']);
>>>>>>> 7a6cee6 (all changes done)
    Route::post('agents/{agent}/assign-group', [AgentController::class, 'assignGroup'])->name('agents.assignGroup');
    Route::post('groups/{group}/set-supervisor', [GroupController::class, 'setSupervisor'])->name('groups.setSupervisor');
    Route::post('users/{user}/assign-unit', [AdminUserController::class, 'assignUnit'])->name('users.assignUnit');
});



// ----------- Agent routes -----------
Route::prefix('agent')->name('agent.')->middleware('auth:agent')->group(function () {
    Route::get('/dashboard', function () {
        $agent = auth('agent')->user();
        return Inertia::render('Agent/Dashboard', [
            'auth' => ['user' => $agent],
        ]);
    })->name('dashboard');

    Route::get('/tickets', [\App\Http\Controllers\Agent\TicketController::class, 'index'])
        ->name('tickets.index');
    Route::post('/tickets/{ticket}/assign', [\App\Http\Controllers\Agent\TicketController::class, 'assign'])
        ->name('tickets.assign');
    Route::post('/tickets/{ticket}/resolve', [\App\Http\Controllers\Agent\TicketController::class, 'resolve'])
    ->name('tickets.resolve');
    Route::get('/tickets/{ticket}', [\App\Http\Controllers\Agent\TicketController::class, 'show'])
        ->name('tickets.show');
    Route::post('/tickets/{ticket}/message', [\App\Http\Controllers\Agent\TicketController::class, 'sendMessage'])
        ->name('tickets.message');
    Route::post('/tickets/{ticket}/request-help', [\App\Http\Controllers\Agent\TicketController::class, 'requestHelp'])
        ->name('tickets.requestHelp');
    Route::post('/tickets/{ticket}/assign-agent', [\App\Http\Controllers\Agent\TicketController::class, 'assignToAgent'])
        ->name('tickets.assignAgent');
         Route::get('/notifications', [AgentNotificationController::class, 'index'])
        ->name('notifications.index');
    Route::get('/historiques', [AgentHistoriqueController::class, 'index'])
        ->name('historiques.index');
    Route::post('/logout', [AgentLogoutController::class, '__invoke'])->name('logout');
   
});


// ----------- Utilisateur routes -----------
Route::prefix('utilisateur')
    ->name('utilisateur.')
    ->middleware('auth:utilisateur')
    ->group(function () {
        
        // Tableau de bord
        Route::get('/dashboard', [UtilisateurDashboardController::class, 'index'])
            ->name('dashboard');

        // Tickets
        Route::get('/tickets', [UtilisateurTicketController::class, 'index'])
            ->name('tickets.index'); // <-- pour ton Dashboard.jsx (liste)
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

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index'])
    ->name('notifications.index');

        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])
    ->name('notifications.read');

    Route::delete('/notifications/{id_notification}', [NotificationController::class, 'destroy'])
    ->name('notifications.destroy');


        // Historiques
        Route::get('/historiques', [HistoriqueController::class, 'index'])
            ->name('historiques.index');

        // Welcome page utilisateur (si besoin)
        Route::get('/welcome', function () {
            return Inertia::render('Utilisateur/Welcome');
        })->name('welcome');

        // Déconnexion
        Route::post('/logout', [LogoutController::class, '__invoke'])
            ->name('logout');
    });

// ----------- Profile routes (communs aux utilisateurs connectés) -----------
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
