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
        $data['cree_par'] = auth('admin')->user()?->id_admin ?? AdminModel::query()->value('id_admin');
        
        $agent = Agent::create($data);
        
        // If agent is supervisor and has a group, set that group's superviseur
        if ($agent->est_superviseur && $agent->groupe) {
            Groupe::where('id_groupe', $agent->groupe)
                ->update(['superviseur_id' => $agent->id_agent]);
        }
        
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
		$oldGroupId = $agent->getOriginal('groupe');
		$oldIsSupervisor = (bool) $agent->getOriginal('est_superviseur');

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $agent->update($data);

        // Keep groupe.superviseur_id in sync
        $newGroupId = $agent->groupe;
        $newIsSupervisor = (bool) $agent->est_superviseur;

        // If agent was supervisor of old group and either unchecked or moved groups, clear old group's superviseur
        if ($oldIsSupervisor && $oldGroupId && ($oldGroupId !== $newGroupId || !$newIsSupervisor)) {
            Groupe::where('id_groupe', $oldGroupId)
                ->where('superviseur_id', $agent->id_agent)
                ->update(['superviseur_id' => null]);
        }

        // If agent is supervisor now and has a (new/current) group, set that group's superviseur
        if ($newIsSupervisor && $newGroupId) {
            Groupe::where('id_groupe', $newGroupId)
                ->update(['superviseur_id' => $agent->id_agent]);
        }
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
        $oldGroupId = $agent->groupe;
        $newGroupId = $validated['groupe'] ?? null;

        $agent->update(['groupe' => $newGroupId]);

        // Sync superviseur_id if this agent is a supervisor
        if ($agent->est_superviseur) {
            // Clear old group's supervisor if it was this agent
            if ($oldGroupId && $oldGroupId !== $newGroupId) {
                Groupe::where('id_groupe', $oldGroupId)
                    ->where('superviseur_id', $agent->id_agent)
                    ->update(['superviseur_id' => null]);
            }

            // Set new/current group's supervisor to this agent
            if ($newGroupId) {
                Groupe::where('id_groupe', $newGroupId)
                    ->update(['superviseur_id' => $agent->id_agent]);
            }
        } else {
            // If agent is not supervisor and moved groups, ensure old group's superviseur isn't incorrectly pointing to them
            if ($oldGroupId && $oldGroupId !== $newGroupId) {
                Groupe::where('id_groupe', $oldGroupId)
                    ->where('superviseur_id', $agent->id_agent)
                    ->update(['superviseur_id' => null]);
            }
        }
        return back()->with('success', 'Agent group updated');
    }
}
