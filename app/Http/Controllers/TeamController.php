<?php

namespace App\Http\Controllers;

use App\Models\Team;
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
        return Inertia::render('CookingTeam/Index', ['teams' => Team::all()]);
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
            'avatar_url' => 'string|max:255',
            'prenom' => 'string|max:255',
            'nom' => 'string|max:255',
            'role' => 'string|max:255',
            'presentation' => 'string|max:1000',
        ]);

        // Create a new team entry using the validated data
        $team = Team::create($validated);

        // Optionally, redirect to a page showing the newly created team
        return redirect()->route('cooking-team.index')->with('success', 'Team created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(team $team)
    {
        //
    }

    public function update(Request $request, Team $team): RedirectResponse
    {
        $validated = $request->validate([
            'prenom' => 'string|max:255',
            'nom' => 'string|max:255',
            'role' => 'string|max:255',
            'presentation' => 'string|max:1000'
        ]);

        $team->update($validated);
        return redirect(route('cooking-team.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team): RedirectResponse
    {
        $team->delete();
        return redirect(route('cooking-team.index'));
    }
}
