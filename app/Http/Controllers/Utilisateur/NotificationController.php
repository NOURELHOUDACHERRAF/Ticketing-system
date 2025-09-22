<?php

namespace App\Http\Controllers\Utilisateur;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::guard('utilisateur')->user();

        $notifications = Notification::where('destinataire_id', $user->id_utilisateur)
            ->where('type_destinataire', 'UTILISATEUR')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Utilisateur/Notifications/Index', [
            'notifications' => $notifications,
            'user' => $user,
        ]);
    }
}
