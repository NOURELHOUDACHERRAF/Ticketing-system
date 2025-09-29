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
 public function markAsRead($id)
{
    $notification = Notification::findOrFail($id);
    $notification->update(['read_at' => now()]); // si ta colonne existe
    return back();
}
public function destroy($id_notification)
{
    $notification = Notification::where('id_notification', $id_notification)
        ->where('destinataire_id', auth()->id()) // sécurité : supprime seulement les notifs de l’utilisateur connecté
        ->firstOrFail();

    $notification->delete();

    return back()->with('success', 'Notification supprimée.');
}

}
