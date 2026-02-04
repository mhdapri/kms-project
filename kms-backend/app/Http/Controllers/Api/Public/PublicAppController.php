<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\App;

class PublicAppController extends Controller
{
    //
    public function index()
    {
        return response()->json([
            'data' => App::orderBy('id')->get(),
        ]);
    }

}
