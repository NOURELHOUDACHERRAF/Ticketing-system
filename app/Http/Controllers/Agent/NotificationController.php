<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::guard('agent')->user();

        $notifications = Notification::where('destinataire_id', $user->id_agent)
            ->where('type_destinataire', 'AGENT')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Agent/Notifications/Index', [
            'notifications' => $notifications,
            'user' => $user,
        ]);
    }
}
