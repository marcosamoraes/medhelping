<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::select('id', 'name', 'image')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'REGEXP', $search);
            })
            ->orderBy('name', 'ASC')->get();

        return response()->json($categories, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json([
            'category' => new CategoryResource($category),
        ], 200);
    }
}
