<?php

namespace App\Http\Controllers;
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
        $files = File::latest()->get();
        return Inertia::render('FileUpload/Index', compact('files'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(Request $request): RedirectResponse
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'file' => ['required'],
        ])->validate();

        $fileName = time().'.'.$request->file->extension();
        $request->file->move(public_path('uploads'), $fileName);

        File::create([
            'title' => $request->title,
            'name' => $fileName
        ]);

        return redirect()->route('file.upload');
    }
}
