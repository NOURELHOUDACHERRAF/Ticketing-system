<?php
namespace App\Http\Controllers\Utilisateur\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        Auth::guard('utilisateur')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Inertia-compatible redirect
        return Inertia::location('/login');
    }
}