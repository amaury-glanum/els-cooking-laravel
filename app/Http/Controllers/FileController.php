<?php

namespace App\Http\Controllers;
use App\Models\Projects;
use Illuminate\Support\Facades\Storage;
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
        dd($request->file->path());
        if($request->hasFile('file')) if($request->file('file')->isValid()) {
            $file = $request->file('file');

            $path = $request->file->path();
            $extension = $request->file->extension();
            /** @var TYPE_NAME $fileName */
            $fileName = $request->title . '_' . time() . '.' . $extension;
            /** @var TYPE_NAME $filePath */
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
        } else {
            return redirect()->route('file.upload')->with('error', "Le fichier n'a pas été uploadé.");
        }
        return redirect()->route('file.upload')->with('error', "Le fichier n'a pas été uploadé.");
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
}

