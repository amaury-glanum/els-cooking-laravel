<?php

namespace App\Http\Controllers;

use App\Models\Medias;
use App\Models\Members;
use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Storage;

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Admin\AdminApi;
class MediasController extends Controller
{
    private array $cloudProviders = [
        'cloudinary', 'local'
    ];

    private array $providersUrls = [
        'cloudinary' => 'cloudinary-url', 'local' => '/file-upload'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
//        if(Configuration::instance(env('CLOUDINARY_URL'))) {
//            Configuration::instance(env('CLOUDINARY_URL'));
//            $publicId = 'elstogo/project-5_wvb3ne';
//            $admin = new AdminApi();
//            $resources = $admin->assets();
//
//            foreach ($resources['resources'] as $resource) {
//                $publicId = $resource['public_id'];
//            }
//        }

       return Inertia::render('Gallery/Index', [
            'providers' => $this->cloudProviders,
            'providersUrls' => $this->providersUrls,
            'medias' => Medias::all(),
            'members' => Members::all(),
            'projects' => Projects::all(),
            'authors' => Members::with('user:id,name')->get()
        ]);
    }

    private function extractFileName(string $filePath) {
        $file = basename($filePath);
        // Further process if needed, for example, removing the extension explicitly
        $fileNameParts = explode('.', $file);
        $fileNameBase = implode('.', array_slice($fileNameParts, 0, -1));

        // Update the file path with the modified name
        return $fileNameBase;
    }


    public function GetProvider(string $providerName): RedirectResponse
    {
        Configuration::instance(env('CLOUDINARY_URL'));
        $admin = new AdminApi();

        switch ($providerName) {
            case 'cloudinary':
                $resources = $admin->assets()['resources'];
                break;
            case 'local':
                $files = Storage::disk('local')->allFiles('');
                $resources = [];

                foreach ($files as &$file) {
                    // Extract the file ID/name without extension
                    $fileId = $this->extractFileName($file); // Assuming this method returns the desired file ID/name
                    $fileRootPath = dirname($file);

                    // Get the MIME type of the file
                    $mim = Storage::mimeType($file);
                    if($mim && $fileRootPath === 'public/uploads') {
                        $resources[] = ["public_id" => $fileId, "format" => basename($mim), "slug" => $file, "path" => $fileRootPath];
                    }
                        // Directly push the associative array into $resources


                }
                break;
            default:
                $resources = ['resources' => []];
        }

        $exist = 0;
        $new = 0;

        foreach ($resources as $resource) {
            $slug = $providerName === 'local' ? $resource['slug'] : "";
            $folderPath = $providerName === 'local' ? $resource['path'] : "";
            $description = $providerName === 'local' ? $resource['path'] : "";
            $existingMedia = Medias::where('media_provider_id', $resource['public_id'])
                ->where('media_provider', $providerName)
                ->first();

            if ($existingMedia) {
                // Update the existing record
                $existingMedia->update([
                    'media_name' => $resource['public_id'],
                    'media_provider_id' => $resource['public_id'],
                    'media_extension' => $resource['format'],
                    'media_provider_ext' => $resource['format'],
                    'media_slug' => $slug,
                    'media_description' => $description,
                    'media_type' => 'image',

                ]);
                $exist += 1;
            } else {
                // Create a new record
                Medias::create([
                    'media_name' => $resource['public_id'],
                    'media_provider' => $providerName,
                    'media_provider_id' => $resource['public_id'],
                    'media_provider_ext' => $resource['format'],
                    'media_slug' => $slug,
                    'media_description' => $description,
                    'media_type' => 'image',
                ]);
                $new += 1;
            }
        }
        $new = strval($new);
        $exist = strval($exist);
        $providerNameCap = ucfirst($providerName);

        return redirect(route('cooking-medias.index'))->with('success', "$providerNameCap activé: $new media ajouté et $exist médias mis à jour" );
    }

    public function downProvider(string $providerName): RedirectResponse {
        Medias::where('media_provider', $providerName)->delete();
        $providerNameCap = ucfirst($providerName);
        return redirect()->route('cooking-medias.index')->with('success', "$providerNameCap a été désactivé et ses medias supprimés sur els-cooking");
    }

    public function mediaToProject(Request $request, int $media_id, int $project_id): RedirectResponse {

        $project = Projects::find($project_id);
        $media = Medias::find($media_id);

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
