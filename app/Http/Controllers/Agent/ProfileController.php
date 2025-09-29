<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        $agent = auth('agent')->user();
        return Inertia::render('Agent/Profile/Edit', [
            'auth' => ['user' => $agent],
        ]);
    }

    public function update(Request $request)
    {
        $agent = auth('agent')->user();

        $validated = $request->validate([
            'nom' => ['required','string','max:255'],
            'prenom' => ['required','string','max:255'],
            'email' => ['required','email','max:255','unique:agents,email,'.$agent->id_agent.',id_agent'],
            'telephone' => ['nullable','string','max:50'],
        ]);

        $agent->fill($validated);
        $agent->save();

        return back()->with('status', 'profile-updated');
    }

    public function updatePassword(Request $request)
    {
        $agent = auth('agent')->user();

        $validated = $request->validate([
            'current_password' => ['required'],
            'password' => ['required','confirmed','min:8'],
        ]);

        if (!Hash::check($validated['current_password'], $agent->password)) {
            return back()->withErrors(['current_password' => 'Mot de passe actuel incorrect.']);
        }

        $agent->password = Hash::make($validated['password']);
        $agent->save();

        return back()->with('status', 'password-updated');
    }
}


