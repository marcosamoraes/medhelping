<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $folder)
    {
        try {
            $extension = $request->file('file')->getClientOriginalExtension();

            if ($extension === 'mp4' || $extension === 'mov') {
                $url = $request->file('file')->storePublicly($folder);
            } else {
                $image = Image::make($request->file('file'))
                    ->orientate()
                    ->resize(800, 800, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });
                $url = "{$folder}/" . uniqid() . '.' . $extension;
                Storage::put($url, $image->stream());
            }

            return response()->json($url, 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao realizar upload',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
