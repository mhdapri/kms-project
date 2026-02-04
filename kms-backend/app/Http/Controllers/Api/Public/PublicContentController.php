<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Content;

class PublicContentController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Content::with('app')
        ->where('status', 'published')
        ->latest();

        if($request->app_slug)
            {
                $query->whereHas('app', function($q) use ($request){
                    $q->where('slug', $request->app_slug);
                });
            }

            return response()->json([
                'data' => $query->paginate(10)
            ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'app_id' => ['required', 'exists:apps,id'],
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ]);

        $content = Content::create([
            'app_id' => $data['app_id'],
            'user_id' => null,
            'title' => $data['title'],
            'body' => $data['body'],
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Konten berhasil dikirim, menunggu approval admin',
            'data' => $content,
        ], 201);
    }
}

