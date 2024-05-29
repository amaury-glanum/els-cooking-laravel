<?php

namespace App\Http\Controllers;

use App\Models\Medias;
use App\Models\Members;
use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Admin\AdminApi;
class MediasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
       return Inertia::render('Gallery/Index', [
            'medias' => Medias::all(),
            'members' => Members::all(),
            'projects' => Projects::all(),
            'authors' => Members::with('user:id,name')->get()
        ]);
    }

    public function GetCloudinary(): RedirectResponse
    {
        Configuration::instance(env('CLOUDINARY_URL'));
        $admin = new AdminApi();
        $resources = $admin->assets();
        $exist = 0;
        $new = 0;

        foreach ($resources['resources'] as $resource) {
            $existingMedia = Medias::where('media_provider_id', $resource['public_id'])
                ->where('media_provider', 'cloudinary')
                ->first();

            if ($existingMedia) {
                // Update the existing record
                $existingMedia->update([
                    'media_name' => $resource['public_id'],
                    'media_provider_id' => $resource['public_id'],
                    'media_extension' => $resource['format'],
                    'media_provider_ext' => $resource['format'],
                    'media_type' => 'image',

                ]);
                $exist += 1;
            } else {
                // Create a new record
                Medias::create([
                    'media_name' => $resource['public_id'],
                    'media_provider' => 'cloudinary',
                    'media_provider_id' => $resource['public_id'],
                    'media_provider_ext' => $resource['format'],
                    'media_type' => 'image',
                ]);
                $new += 1;
            }
        }
        $new = strval($new);
        $exist = strval($exist);
        return redirect(route('cooking-medias.index'))->with('success', "Cloudinary activé: $new media ajouté et $exist médias mis à jour" );
    }

    public function downCloudinary(): RedirectResponse {
        Medias::where('media_provider', 'cloudinary')->delete();

        return redirect()->route('cooking-medias.index')->with('success', 'Cloudinary a été désactivé et ses medias supprimés sur els-cooking');
    }

    public function mediaToProject(Request $request): RedirectResponse {
        $projectId = $request->project_id;
        $mediaId = $request->media_id;

        $project = Projects::find($projectId);
        $media = Medias::find($mediaId);

//        dd($media, $project);

        $project->medias()->attach($media->id);
        $projectName = $project->project_title;
        return redirect()->route('cooking-medias.index')->with('success', "Le média sélectionné a bien été rattaché à $projectName");
    }

    public function mediasToProject(Request $request, array $media_ids, int $project_id): RedirectResponse {
        $project = Projects::find($project_id);
        $media = Medias::find($media_ids);

        $project->medias()->attach($media->id);
        $projectName = $project->project_title;
        return redirect()->route('cooking-medias.index')->with('success', "Les médias sélectionnés ont bien été rattaché à $projectName");
    }

    public function getMediaByProject(int $projectId) {

//        $project = Projects::find($projectId);
//
//        // Eager load the medias relationship
//        $project->load('medias');

        $project = Projects::with('medias')->find($projectId);

        if (!$project) {
            abort(404); // Or return a custom response
        }

        // Transform the media data into a format suitable for the frontend
        $mediaData = $project->medias->map(function ($media) {
            return [
                'id' => $media->id,
                'name' => $media->media_name, // Assuming your Media model has a title attribute
                // Add other attributes as needed
            ];
        })->toArray();

        return redirect()->route('project.medias', ['project-medias' => $mediaData]);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Medias $medias)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medias $medias)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medias $medias)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medias $medias)
    {
        //
    }
}
