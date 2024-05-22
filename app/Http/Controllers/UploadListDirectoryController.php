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
        $items = Gdrive::all('/');

//        return Inertia::render('Gallery/Partials/GdriveList', [
//            'folders' => $items
//        ]);

        return response()->json($items);
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
