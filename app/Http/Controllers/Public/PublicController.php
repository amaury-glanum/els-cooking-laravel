<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function home()
    {
        return view('public.home', ['pageId' => 'page-home']);
    }

    public function legal()
    {
        return view('public.legal', ['pageId' => 'page-legal']);
    }

    public function confidentiality()
    {
        return view('public.confidentiality', ['pageId' => 'page-confidentiality']);
    }

    public function credits()
    {
        return view('public.credits', ['pageId' => 'page-credits']);
    }

}
