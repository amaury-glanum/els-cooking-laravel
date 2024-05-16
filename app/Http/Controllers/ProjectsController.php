<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('CookingProjects/Index', ['projects' => Projects::all()]);
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
            'project_date' => 'string|nullable',
            'project_place' => 'string|nullable',
            'project_category' => 'string|nullable',
            'project_title' => 'string|required|max:255',
            'project_extract' => 'string|nullable|max:255',
            'project_teaser' => 'string|nullable|max:1000',
            'project_description' => 'string|nullable',
            'project_goal' => 'string|nullable',
            'project_method' => 'string|nullable',
            'project_results' => 'string|nullable',
            'project_single_url' => 'string|nullable|max:255',
            'project_img_url' => 'string|nullable|max:255',
            'project_img_name' => 'string|nullable|max:255',

            'project_publish_status' => 'string|nullable|max:255',
        ]);

        // Create a new project entry using the validated data
        $project = Projects::create($validated);

        // Optionally, redirect to a page showing the newly created project
        return redirect()->route('cooking-projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Projects $projects)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Projects $projects)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projects $projects)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $project = Projects::find($id);
        Gate::authorize('delete', $project);
        $project->delete();
        return redirect(route('cooking-projects.index'));
    }
}