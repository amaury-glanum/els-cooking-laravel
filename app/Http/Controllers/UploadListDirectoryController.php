<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class UploadListDirectoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = Gdrive::all('/');
        dd($data);
        return response($data, 200);

//        return response($data->file, 200)
//            ->header('Content-Type', $data->ext);

//        return Inertia::render('Gallery/Partials/GdriveList', [
//            'folders' => $data,
//        ]);

//        return response()->json($items);
    }

//    public function __invoke(Request $request): Response
//    {
//        $items = Gdrive::all('/');
//        dd($items);
//
//       $items = Gdrive::all('your-folder');
//
//        return response($items, 200);
//    }
}
