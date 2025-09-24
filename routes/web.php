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
    Route::resource('categories', CategorieController::class)->except(['show']);

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
