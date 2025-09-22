<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAgentRequest;
use App\Http\Requests\Admin\UpdateAgentRequest;
use App\Models\Admin as AdminModel;
use App\Models\Agent;
use App\Models\Groupe;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AgentController extends Controller
{
    public function index(): Response
    {
        $agents = Agent::query()->with('groupeRelation')->orderBy('nom')->paginate(10);
        $groups = Groupe::orderBy('nom')->get(['id_groupe', 'nom']);
        return Inertia::render('Admin/Agents/Index', [
            'agents' => $agents,
            'groups' => $groups,
        ]);
    }

    public function create(): Response
    {
        $groups = Groupe::orderBy('nom')->get(['id_groupe', 'nom']);
        return Inertia::render('Admin/Agents/Create', [
            'groups' => $groups,
        ]);
    }

    public function store(StoreAgentRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $data['cree_par'] = auth()->user()?->id ?? AdminModel::query()->value('id_admin');
        Agent::create($data);
        return redirect()->route('admin.agents.index')->with('success', 'Agent created');
    }

    public function edit(Agent $agent): Response
    {
        $groups = Groupe::orderBy('nom')->get(['id_groupe', 'nom']);
        return Inertia::render('Admin/Agents/Edit', [
            'agent' => $agent,
            'groups' => $groups,
        ]);
    }

    public function update(UpdateAgentRequest $request, Agent $agent): RedirectResponse
    {
        $data = $request->validated();
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $agent->update($data);
        return redirect()->route('admin.agents.index')->with('success', 'Agent updated');
    }

    public function destroy(Agent $agent): RedirectResponse
    {
        $agent->delete();
        return redirect()->route('admin.agents.index')->with('success', 'Agent deleted');
    }

    public function assignGroup(Request $request, Agent $agent): RedirectResponse
    {
        $validated = $request->validate([
            'groupe' => ['nullable', 'exists:groupe,id_groupe']
        ]);
        $agent->update(['groupe' => $validated['groupe'] ?? null]);
        return back()->with('success', 'Agent group updated');
    }
}
