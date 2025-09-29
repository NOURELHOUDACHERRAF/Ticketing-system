<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategorieRequest;
use App\Http\Requests\Admin\UpdateCategorieRequest;
use App\Models\Categorie;
use App\Models\Groupe;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
<<<<<<< HEAD

=======
use Illuminate\Http\Request;
>>>>>>> 7a6cee6 (all changes done)
class CategorieController extends Controller
{
    public function index(): Response
    {
        $categories = Categorie::with('groupe')->orderBy('Nom')->paginate(10);
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        $groups = Groupe::orderBy('nom')->get(['id_groupe', 'nom']);
        return Inertia::render('Admin/Categories/Create', [
            'groups' => $groups,
        ]);
    }

    public function store(StoreCategorieRequest $request): RedirectResponse
    {
        Categorie::create($request->validated());
        return redirect()->route('admin.categories.index')->with('success', 'Category created');
    }

    public function edit(Categorie $category): Response
    {
        $groups = Groupe::orderBy('nom')->get(['id_groupe', 'nom']);
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'groups' => $groups,
        ]);
    }

    public function update(UpdateCategorieRequest $request, Categorie $category): RedirectResponse
    {
        $category->update($request->validated());
        return redirect()->route('admin.categories.index')->with('success', 'Category updated');
    }

    public function destroy(Categorie $category): RedirectResponse
    {
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success', 'Category deleted');
    }
}
