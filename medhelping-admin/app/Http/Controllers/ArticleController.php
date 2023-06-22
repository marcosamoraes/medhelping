<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Models\Article;
use App\Models\Category;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::paginate();

        $title = 'Deletar artigo';
        $text = "Você tem certeza que quer deletar esse artigo?";
        confirmDelete($title, $text);

        return view('articles.index', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::pluck('name', 'id')->toArray();
        return view('articles.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleStoreRequest $request)
    {
        try {
            $data = $request->validated();
            $data['anonymous_publication'] = true;

            if (isset($data['image'])) {
                $data['image'] = $request->file('image')->store('articles');
            }
            
            $article = Article::create($data);

            $article->articleCategories()->create(['category_id' => $request->category1]);
            
            if (isset($request->category2)) {
                $article->articleCategories()->create(['category_id' => $request->category2]);
            }

            if (isset($request->category3)) {
                $article->articleCategories()->create(['category_id' => $request->category3]);
            }

            Alert::toast('Artigo cadastrado com sucesso.', 'success');
            return Redirect::route('articles.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao cadastrar artigo.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $categories = Category::pluck('name', 'id')->toArray();
        return view('articles.edit', compact('article', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleUpdateRequest $request, Article $article)
    {
        try {
            $data = $request->validated();

            if (isset($data['image'])) {
                if ($article->image) {
                    Storage::delete($article->image);
                }
                $data['image'] = $request->file('image')->store('articles');
            }
            
            $article->update($data);

            $article->articleCategories()->delete();

            $article->articleCategories()->create(['category_id' => $request->category1]);
            
            if (isset($request->category2)) {
                $article->articleCategories()->create(['category_id' => $request->category2]);
            }

            if (isset($request->category3)) {
                $article->articleCategories()->create(['category_id' => $request->category3]);
            }

            Alert::toast('Artigo editado com sucesso.', 'success');
            return Redirect::route('articles.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao editar artigo.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        Alert::toast('Artigo deletado com sucesso.', 'success');
        return back();
    }
}
