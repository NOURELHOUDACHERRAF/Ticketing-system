<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\Admin as AdminModel;
use App\Models\UniteOrg;
use App\Models\Utilisateur;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UtilisateurController extends Controller
{
    public function index(): Response
    {
        $users = Utilisateur::query()->with('uniteOrganisationnelle')->orderBy('nom')->paginate(10);
        $units = UniteOrg::orderBy('nom')->get(['Num', 'nom']);
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'units' => $units,
        ]);
    }

    public function create(): Response
    {
        $units = UniteOrg::orderBy('nom')->get(['Num', 'nom']);
        return Inertia::render('Admin/Users/Create', [
            'units' => $units,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $data['cree_par'] = auth()->user()?->id ?? AdminModel::query()->value('id_admin');
        Utilisateur::create($data);
        return redirect()->route('admin.users.index')->with('success', 'User created');
    }

    public function edit(Utilisateur $user): Response
    {
        $units = UniteOrg::orderBy('nom')->get(['Num', 'nom']);
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'units' => $units,
        ]);
    }

    public function update(UpdateUserRequest $request, Utilisateur $user): RedirectResponse
    {
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return redirect()->route('admin.users.index')->with('success', 'User updated');
    }

    public function destroy(Utilisateur $user): RedirectResponse
    {
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted');
    }

    public function assignUnit(Request $request, Utilisateur $user): RedirectResponse
    {
        $validated = $request->validate([
            'Unit_org' => ['nullable', 'exists:unite_org,Num']
        ]);
        $user->update(['Unit_org' => $validated['Unit_org'] ?? null]);
        return back()->with('success', 'User unit updated');
    }
}
