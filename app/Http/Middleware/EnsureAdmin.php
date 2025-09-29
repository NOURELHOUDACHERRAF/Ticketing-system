<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
{
    $user = auth('admin')->user(); // 🔑 guard admin

    if (!$user) {
        return redirect()->route('login');
    }

    if (!($user instanceof Admin)) {
        abort(403, 'Accès refusé. Administrateur requis.');
    }

    return $next($request);
}

}
