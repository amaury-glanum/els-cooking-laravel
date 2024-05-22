<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\Members;
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
        return Inertia::render('CookingProjects/Index', [
            'projects' => Projects::all(),
            'authors' => Projects::with('user:id,name')->get()]);
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

            'project_publish_status' => 'required|string|max:255',
        ], [
            'user_id.required' => 'L\'identifiant de l\'utilisateur est obligatoire.',
            'user_id.integer' => 'L\'identifiant de l\'utilisateur doit être un nombre entier.',
            'project_date.string' => 'La date du projet doit être une chaîne de caractères.',
            'project_place.string' => 'Le lieu du projet doit être une chaîne de caractères.',
            'project_category.string' => 'La catégorie du projet doit être une chaîne de caractères.',
            'project_title.required' => 'Le titre du projet est obligatoire.',
            'project_title.string' => 'Le titre du projet doit être une chaîne de caractères.',
            'project_title.max' => 'Le titre du projet ne doit pas dépasser 255 caractères.',
            'project_extract.string' => 'L\'extrait du projet doit être une chaîne de caractères.',
            'project_extract.max' => 'L\'extrait du projet ne doit pas dépasser 255 caractères.',
            'project_teaser.string' => 'Le teaser du projet doit être une chaîne de caractères.',
            'project_teaser.max' => 'Le teaser du projet ne doit pas dépasser 1000 caractères.',
            'project_description.string' => 'La description du projet doit être une chaîne de caractères.',
            'project_goal.string' => 'L\'objectif du projet doit être une chaîne de caractères.',
            'project_method.string' => 'La méthode du projet doit être une chaîne de caractères.',
            'project_results.string' => 'Les résultats du projet doivent être une chaîne de caractères.',
            'project_single_url.string' => 'L\'URL du projet doit être une chaîne de caractères.',
            'project_single_url.max' => 'L\'URL du projet ne doit pas dépasser 255 caractères.',
            'project_img_url.string' => 'L\'URL de l\'image du projet doit être une chaîne de caractères.',
            'project_img_url.max' => 'L\'URL de l\'image du projet ne doit pas dépasser 255 caractères.',
            'project_img_name.string' => 'Le nom de l\'image du projet doit être une chaîne de caractères.',
            'project_img_name.max' => 'Le nom de l\'image du projet ne doit pas dépasser 255 caractères.',
            'project_publish_status.required' => 'Le statut de publication du projet est obligatoire.',
            'project_publish_status.string' => 'Le statut de publication du projet doit être une chaîne de caractères.',
            'project_publish_status.max' => 'Le statut de publication du projet ne doit pas dépasser 255 caractères.',
        ]);

        // Create a new project entry using the validated data
        $project = Projects::create($validated);

        // Optionally, redirect to a page showing the newly created project
        return redirect()->route('cooking-projects.index')->with('success', 'Vous avez bien créer le projet.');
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
     * Update the specified row : publish status.
     */
    public function publish($id): RedirectResponse
    {
        $projects = Projects::find($id);
        Gate::authorize('update', $projects);
        $projects->update(['project_publish_status' => 'published']);
        return redirect(route('cooking-projects.index'))->with('success', 'Projet publié');
    }

    public function draft($id): RedirectResponse
    {
        $projects = Projects::find($id);
        Gate::authorize('update', $projects);
        $projects->update(['project_publish_status' => 'draft']);
        return redirect(route('cooking-projects.index'))->with('success', 'Projet redevenu brouillon.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        $projects = Projects::find($id);

        Gate::authorize('update', $projects);
        $validated = $request->validate([
            'project_date' => 'string|nullable',
            'project_place' => 'string|nullable',
            'project_category' => 'string|nullable',
            'project_title' => 'string|nullable|max:255',
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
        ], [
            'user_id.required' => 'L\'identifiant de l\'utilisateur est obligatoire.',
            'user_id.integer' => 'L\'identifiant de l\'utilisateur doit être un nombre entier.',
            'project_date.string' => 'La date du projet doit être une chaîne de caractères.',
            'project_place.string' => 'Le lieu du projet doit être une chaîne de caractères.',
            'project_category.string' => 'La catégorie du projet doit être une chaîne de caractères.',
            'project_title.string' => 'Le titre du projet doit être une chaîne de caractères.',
            'project_title.max' => 'Le titre du projet ne doit pas dépasser 255 caractères.',
            'project_extract.string' => 'L\'extrait du projet doit être une chaîne de caractères.',
            'project_extract.max' => 'L\'extrait du projet ne doit pas dépasser 255 caractères.',
            'project_teaser.string' => 'Le teaser du projet doit être une chaîne de caractères.',
            'project_teaser.max' => 'Le teaser du projet ne doit pas dépasser 1000 caractères.',
            'project_description.string' => 'La description du projet doit être une chaîne de caractères.',
            'project_goal.string' => 'L\'objectif du projet doit être une chaîne de caractères.',
            'project_method.string' => 'La méthode du projet doit être une chaîne de caractères.',
            'project_results.string' => 'Les résultats du projet doivent être une chaîne de caractères.',
            'project_single_url.string' => 'L\'URL du projet doit être une chaîne de caractères.',
            'project_single_url.max' => 'L\'URL du projet ne doit pas dépasser 255 caractères.',
            'project_img_url.string' => 'L\'URL de l\'image du projet doit être une chaîne de caractères.',
            'project_img_url.max' => 'L\'URL de l\'image du projet ne doit pas dépasser 255 caractères.',
            'project_img_name.string' => 'Le nom de l\'image du projet doit être une chaîne de caractères.',
            'project_img_name.max' => 'Le nom de l\'image du projet ne doit pas dépasser 255 caractères.',
            'project_publish_status.string' => 'Le statut de publication du projet doit être une chaîne de caractères.',
            'project_publish_status.max' => 'Le statut de publication du projet ne doit pas dépasser 255 caractères.',
        ]);

        $filledData = array_filter($validated, function($value) {
            return !is_null($value) && $value !== '';
        });

        $projects->update($filledData);
        return redirect(route('cooking-projects.index'))->with('success', 'Le projet a bien été modifié.');
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
