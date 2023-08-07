<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(50);

        $title = 'Deletar categoria';
        $text = "Você tem certeza que quer deletar esse categoria?";
        confirmDelete($title, $text);

        return view('categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request)
    {
        try {
            $data = $request->validated();

            if (isset($data['image'])) {
                $data['image'] = $request->file('image')->store('categories');
            }

            Category::create($data);

            Alert::toast('Categoria cadastrado com sucesso.', 'success');
            return Redirect::route('categories.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao cadastrar categoria.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return view('categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        try {
            $data = $request->validated();

            if (isset($data['image'])) {
                if ($category->image) {
                    Storage::delete($category->image);
                }
                $data['image'] = $request->file('image')->store('categories');
            }

            $category->update($data);

            Alert::toast('Categoria editada com sucesso.', 'success');
            return Redirect::route('categories.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao editar categoria.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        Alert::toast('Categoria deletada com sucesso.', 'success');
        return back();
    }
}
