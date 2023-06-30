<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ArticleStoreRequest;
use App\Http\Requests\Api\ArticleUpdateRequest;
use App\Http\Resources\Api\ArticleResource;
use App\Models\Article;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $articles = Article::when($request->search, function ($query, $search) {
                $query->orWhere('title', 'REGEXP', $search);
                $query->orWhereHas('user', function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search);
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('articleCategories', function ($query) use ($category) {
                    $query->where('category_id', $category);
                });
            })
            ->latest()
            ->paginate($request->per_page ?? 10);

        return response()->json([
            'data'          => ArticleResource::collection($articles),
            'per_page'      => $articles->perPage(),
            'current_page'  => $articles->currentPage(),
            'last_page'     => $articles->lastPage(),
            'total'         => $articles->total(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleStoreRequest $request)
    {
        try {
            $validated = $request->validated();

            $validated['user_id'] = $request->user()->id;

            $article = Article::create($validated);

            foreach ($request->categories as $category) {
                if ($category) {
                    $article->articleCategories()->create([
                        'category_id' => $category,
                    ]);
                }
            }

            return response()->json([
                'message'   => 'Artigo criado com sucesso',
                'article'   => new ArticleResource($article),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao criar artigo',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return response()->json([
            'article' => new ArticleResource($article),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleUpdateRequest $request, Article $article)
    {
        try {
            $validated = $request->validated();

            if (isset($data['image'])) {
                if ($article->image) {
                    Storage::delete($article->image);
                }
                $data['image'] = $request->file('image')->store('articles');
            }

            $article->update($validated);

            $article->articleCategories()->sync($request->categories);

            return response()->json([
                'message'   => 'Artigo atualizado com sucesso',
                'article'   => new ArticleResource($article),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao atualizar artigo',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        try {
            $article->delete();

            return response()->json([
                'message'   => 'Artigo excluído com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao excluir artigo',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Like the specified resource from storage.
     */
    public function like(Request $request, Article $article)
    {
        try {
            $userAlreadyLiked = $article->articleLikes()->where('user_id', $request->user()->id)->first();
            if ($userAlreadyLiked) {
                $article->articleLikes()->where('user_id', $request->user()->id)->delete();

                return response()->json([
                    'message'   => 'Artigo descurtido com sucesso',
                ], 200);
            }

            $article->articleLikes()->create([
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'message'   => 'Artigo curtido com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao curtir artigo',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Comment the specified resource from storage.
     */
    public function comment(Request $request, Article $article)
    {
        try {
            $validated = $request->validate([
                'message'               => ['required', 'string'],
                'anonymous_publication' => ['required', 'boolean'],
                'comment_id'            => ['nullable', 'exists:comments,id'],
            ]);

            $data = [
                'user_id'               => $request->user()->id,
                'message'               => $validated['message'],
                'anonymous_publication' => $validated['anonymous_publication'],
                'type'                  => 'article',
            ];

            if (isset($validated['comment_id'])) {
                $data['comment_id'] = $validated['comment_id'];
            }

            $article->comments()->create($data);

            return response()->json([
                'message'   => 'Comentário criado com sucesso',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao criar comentário',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Share the specified resource from storage.
     */
    public function share(Article $article)
    {
        $article->update(['quantity_shared' => $article->quantity_shared + 1]);
        return response()->json(null, 200);
    }
}
