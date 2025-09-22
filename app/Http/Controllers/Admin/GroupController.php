<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGroupRequest;
use App\Http\Requests\Admin\UpdateGroupRequest;
use App\Models\Admin as AdminModel;
use App\Models\Agent;
use App\Models\Groupe;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function index(): Response
    {
        $groups = Groupe::query()->with('superviseur')->orderBy('nom')->paginate(10);
        $agents = Agent::query()->orderBy('nom')->get(['id_agent', 'nom', 'prenom']);
        return Inertia::render('Admin/Groups/Index', [
            'groups' => $groups,
            'agents' => $agents,
        ]);
    }

    public function create(): Response
    {
        $agents = Agent::orderBy('nom')->get(['id_agent', 'nom', 'prenom']);
        return Inertia::render('Admin/Groups/Create', [
            'agents' => $agents,
        ]);
    }

    public function store(StoreGroupRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['cree_par'] = auth()->user()?->id ?? AdminModel::query()->value('id_admin');
        Groupe::create($data);
        return redirect()->route('admin.groups.index')->with('success', 'Group created');
    }

    public function edit(Groupe $group): Response
    {
        $agents = Agent::orderBy('nom')->get(['id_agent', 'nom', 'prenom']);
        return Inertia::render('Admin/Groups/Edit', [
            'group' => $group->load('superviseur'),
            'agents' => $agents,
        ]);
    }

    public function update(UpdateGroupRequest $request, Groupe $group): RedirectResponse
    {
        $group->update($request->validated());
        return redirect()->route('admin.groups.index')->with('success', 'Group updated');
    }

    public function destroy(Groupe $group): RedirectResponse
    {
        $group->delete();
        return redirect()->route('admin.groups.index')->with('success', 'Group deleted');
    }

    public function setSupervisor(Request $request, Groupe $group): RedirectResponse
    {
        $validated = $request->validate([
            'superviseur_id' => ['nullable', 'exists:agent,id_agent']
        ]);
        $group->update(['superviseur_id' => $validated['superviseur_id'] ?? null]);
        return back()->with('success', 'Supervisor updated');
    }
}
