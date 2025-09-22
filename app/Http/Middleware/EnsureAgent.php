<?php

namespace App\Http\Middleware;

use App\Models\Agent;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAgent
{
    public function handle(Request $request, Closure $next): Response
    {
        $agent = auth('agent')->user();

        if (!$agent) {
            return redirect()->route('login');
        }

        if (!($agent instanceof Agent)) {
            abort(403, 'Accès refusé. Agent requis.');
        }

        return $next($request);
    }
}
