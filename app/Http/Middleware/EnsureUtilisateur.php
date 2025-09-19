<?php

namespace App\Http\Middleware;

use App\Models\Utilisateur;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureUtilisateur
{
public function handle(Request $request, Closure $next): Response
{
    $user = auth('utilisateur')->user(); // 🔑 guard utilisateur

    if (!$user) {
        return redirect()->route('login');
    }

    if (!($user instanceof Utilisateur)) {
        abort(403, 'Accès refusé. Compte utilisateur requis.');
    }
if (!$user->actif) {
    Auth::guard('utilisateur')->logout();
    return redirect()->route('login')
        ->withErrors(['login' => 'Votre compte est désactivé ou expiré.']);
}
    return $next($request);
}

}