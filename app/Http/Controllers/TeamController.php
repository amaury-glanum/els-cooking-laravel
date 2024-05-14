<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;
use App\Models\Members;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response

    {
        return Inertia::render('CookingTeam/Index', ['members' => Members::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => 'integer|required',
            'prenom' => 'string|max:255',
            'nom' => 'string|max:255',
            'role' => 'string|max:255',
            'presentation' => 'string|max:1000',
        ]);

        // Create a new team entry using the validated data
        $team = Members::create($validated);

        // Optionally, redirect to a page showing the newly created team
        return redirect()->route('cooking-team.index')->with('success', 'Vous avez bien ajouté ce membre à l\' équipe ELS-TOGO.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Members $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Members $team)
    {
        //
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $team = Members::find($id);
 
        Gate::authorize('update', $team);
        $validated = $request->validate([
            'nom' => 'string|max:255',      
        ]);
        $team->update($validated);
        return redirect(route('cooking-team.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $team = Members::find($id);
        Gate::authorize('delete', $team);
        $team->delete();
        return redirect(route('cooking-team.index'));
        // return redirect(route('cooking-team.index'))->with('success', 'Vous avez bien supprimé ce membre de l\' équipe ELS-TOGO.');
    }
}
