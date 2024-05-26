<?php

namespace App\Http\Controllers;
use App\Models\Projects;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\File;
use Inertia\Response;

class FileController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $files = File::all();
        return Inertia::render('FileUpload/Index', [
            'files' => $files,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request): RedirectResponse
    {
        // Get the file from the request
        $file = $request->file('file');
        // Get the original extension of the file
        $extension = $file->getClientOriginalExtension();
        $fileName = $request->title . '_' . time() . '.' . $extension;

        // Store the file using Laravel's Storage facade
        $filePath = $file->storeAs('uploads', $fileName, 'public');

        Validator::make($request->all(), [
            'title' => ['required'],
            'file' => ['required', 'file'],
        ])->validate();

        File::create([
            'title' => $request->title,
            'name' => $filePath
        ]);

        return redirect()->route('file.upload')->with('success', "Le fichier $request->title a bien été stocké.");
    }

    /*
    * Remove the specified resource from storage.
    * @param  int  $id
    * @return \Illuminate\Http\RedirectResponse
    */
    public function destroy(int $id): RedirectResponse
    {
        $file = File::findOrFail($id);

        // Delete the file from storage
        Storage::disk('public')->delete('uploads/' . $file->name);

        // Delete the file record from the database
        $file->delete();

        return redirect()->route('file.upload')->with('success', 'Le fichier a bien été supprimé.');
    }

    /**
     * Download the specified file.
     *
     * @param  int  $id
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function download(int $id): StreamedResponse
    {
        $file = File::findOrFail($id);
        $fileName = basename($file->name);

        // Get the path to the file
        $filePath = storage_path('app/public/uploads/' . $fileName);

        // Check if the file exists
        if (!Storage::disk('public')->exists('uploads/' . $fileName)) {
            dump($fileName);
            abort(404);
        }

        return Storage::download($filePath, $file->title . '.' . pathinfo($filePath, PATHINFO_EXTENSION));

        // Download the file
//        return response()->download($filePath, $file->title . '.' . pathinfo($filePath, PATHINFO_EXTENSION));
    }
}

