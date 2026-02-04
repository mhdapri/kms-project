<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Content;

class AdminContentController extends Controller
{
    //
        public function index(Request $request)
        {
            $query =    Content::with(['app', 'author', 'approver'])->latest();

            if($request->status) {
                $query->where('status', $request->status);
            }

            if ($request->app_id) {
                $query->where('app_id', $request->app_id);
            }
            return response()->json([
                'data' => $query->paginate(10),
            ]);
        }

        public function approve(Request $request, $id)
        {
            $content = Content::findOrFail($id);

            $content->update([
                'status' => 'published',
                'published_at' => now(),
                'approved_by' => $request->user()->id,
                'note_project' => null,

            ]);

            return response()->json([
                'message' => 'Konten berhasil di approve dan dipublish',
                'data' => $content,
            ]);

        }

        public function reject(Request $request, $id)
        {
            $data = $request->validate([
                'note_project' => ['required', 'string'],

            ]);

            $content = Content::findOrFail($id);

            $content->update([
                'status' => 'rejected',
                'approved_by' => $request->user()->id,
                'note_project' => $data['note_project'],
                'published_at' => null,
            ]);

            return response()->json([
                'message' => 'konten berasil di tolak',
                'data' => $content,
            ]);
        }
}