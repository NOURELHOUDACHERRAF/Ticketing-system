<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Utilisateur;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
            'canResetPassword' => true,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $email = $request->email;
        $password = $request->password;
        $remember = $request->boolean('remember');

        // Try to find admin
        $admin = Admin::where('email', $email)->first();
        if ($admin && Hash::check($password, $admin->password)) {
            Auth::guard('admin')->login($admin, $remember);
            $request->session()->regenerate();
            return redirect(route('admin.home'));
        }

        // Try to find utilisateur
        $utilisateur = Utilisateur::where('email', $email)->first();
        if ($utilisateur && Hash::check($password, $utilisateur->password)) {
            if (!$utilisateur->actif) {
                throw ValidationException::withMessages([
                    'email' => ['Your account is deactivated.'],
                ]);
            }

            Auth::guard('utilisateur')->login($utilisateur, $remember);
            $request->session()->regenerate();
            return redirect('/utilisateur/dashboard');

        }

        throw ValidationException::withMessages([
            'email' => ['These credentials do not match our records.'],
        ]);
    }
public function destroy(Request $request)
{
    Auth::guard('web')->logout();       // Log out the user
    $request->session()->invalidate();   // Invalidate session
    $request->session()->regenerateToken(); // Regenerate CSRF token

    // Redirect to login page
    return redirect()->route('login');
}



}
