<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUnitRequest;
use App\Http\Requests\Admin\UpdateUnitRequest;
use App\Models\UniteOrg;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UnitController extends Controller
{
    public function index(): Response
    {
        $units = UniteOrg::query()->orderBy('Num')->paginate(10);
        return Inertia::render('Admin/Units/Index', [
            'units' => $units,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Units/Create');
    }

    public function store(StoreUnitRequest $request): RedirectResponse
    {
        UniteOrg::create($request->validated());
        return redirect()->route('admin.units.index')->with('success', 'Unit created');
    }

    public function edit(UniteOrg $unit): Response
    {
        return Inertia::render('Admin/Units/Edit', [
            'unit' => $unit,
        ]);
    }

    public function update(UpdateUnitRequest $request, UniteOrg $unit): RedirectResponse
    {
        $unit->update($request->validated());
        return redirect()->route('admin.units.index')->with('success', 'Unit updated');
    }

    public function destroy(UniteOrg $unit): RedirectResponse
    {
        $unit->delete();
        return redirect()->route('admin.units.index')->with('success', 'Unit deleted');
    }
}
