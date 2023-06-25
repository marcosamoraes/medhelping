<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $folder)
    {
        try {
            $url = $request->file('file')->store($folder);
            return response()->json($url, 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao realizar upload',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
