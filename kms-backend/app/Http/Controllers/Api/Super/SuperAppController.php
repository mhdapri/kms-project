<?php

namespace App\Http\Controllers\Api\Super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\App;

class SuperAppController extends Controller
{
    //
    public function index()
    {
        return response()->json([
            'data' => App::orderBy('id')->get(),

        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:apps,slug'],
            'description' => ['nullable', 'string'],

            ]);

            $app = App::create($data);
            return response()->json([
                'message' => 'Aplikasi berhasil dibuat',
                'data' => $app,
            ], 201);
    }

    public function update(Request $request, $id)
    {
        $app = App::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:apps', $app->id],
            'description' => ['nullable', 'string'],
        ]);

        $App->update($data);

        return response()->json([
            'message' => 'Aplikasi berhasul diupdate',
            'data' =>$app,
        ]);
    }

    public function destroy($id)
    {
        $app = App::findOrFail($id);
        $app->delete();

        return response()->json([
            'message' => 'Aplikasi berhasil dihapus',
        ]);
    }
}
