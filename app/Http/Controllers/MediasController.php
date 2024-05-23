<?php

namespace App\Http\Controllers;

use App\Models\Medias;
use App\Models\Members;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

use Cloudinary\Configuration\Configuration;
use Cloudinary\Transformation\Resize;
use Cloudinary\Transformation\Background;
use Cloudinary\Tag\ImageTag;
use Cloudinary\Api\Admin\AdminApi;
class MediasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // if ressource not found
        Configuration::instance(env('CLOUDINARY_URL'));
        $publicId = 'elstogo/project-5_wvb3ne';
        $admin = new AdminApi();
        $resources = $admin->assets();

        foreach ($resources['resources'] as $resource) {
            $publicId = $resource['public_id'];
            dump($publicId);
//            Media::create(['public_id' => $publicId]);
        }

       return Inertia::render('Gallery/Index', [
            'medias' => Medias::all(),
            'members' => Members::all(),
            'authors' => Members::with('user:id,name')->get()
        ]);
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
