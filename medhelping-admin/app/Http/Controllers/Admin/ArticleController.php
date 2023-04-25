<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Controller;
use App\Models\Article;
use App\Models\User;
use App\Models\ArticleLike;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Mail;
use App\Mail\ArticleSended;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::all();
        return view('admin.articles.index', compact('articles'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::findOrFail($id);
        return view('admin.articles.show', compact('article'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.articles.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->input('action') == 'fileuploader') {
            $validated = $request->validate([
                'image' => ['nullable']
            ]);

            $image = $validated['image'];

            if ($image != '') {
                $filename = explode('.', $image->getClientOriginalName())[0].'-'.time();
                $filename = $filename . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/articles'), $filename);
            }
            return json_encode(['success' => true, 'filename' => env('APP_URL').'/images/articles/' . $filename]);
        }

        $validated = $request->validate([
            'user_name' => ['required'],
            'user_email' => ['nullable'],
            'title' => ['required'],
            'image' => ['nullable'],
            'content' => ['required'],
            'type' => ['required'],
        ]);

        $validated['type'] = implode(',', $validated['type']);

        $validated['active'] = true;

        if (Article::create($validated)) {
            return redirect(route('admin.artigos.index'))->with('success', 'Artigo cadastrado com sucesso!');
        } else {
            return back()->withErrors([
                'email' => 'Erro ao cadastrar artigo, tente novamente.',
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('admin.articles.edit', compact('article'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->input('action') == 'fileuploader') {
            $validated = $request->validate([
                'image' => ['nullable']
            ]);

            $image = $validated['image'];

            if ($image != '') {
                $filename = explode('.', $image->getClientOriginalName())[0].'-'.time();
                $filename = $filename . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/articles'), $filename);
            }
            return json_encode(['success' => true, 'filename' => env('APP_URL').'/images/articles/' . $filename]);
        }

        $validated = $request->validate([
            'user_name' => ['required'],
            'user_email' => ['nullable'],
            'title' => ['required'],
            'image' => ['nullable'],
            'content' => ['required'],
            'type' => ['required'],
            'active' => ['required'],
        ]);

        $validated['type'] = implode(',', $validated['type']);

        if (Article::where('id', $id)->update($validated)) {
            return redirect(route('admin.artigos.index'))->with('success', 'Artigo editado com sucesso!');
        } else {
            return back()->withErrors([
                'email' => 'Erro ao editar artigo, tente novamente.',
            ])->exceptInput('password');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Article::where('id', $id)->delete()) {
            return back()->with('success', 'Artigo deletado com sucesso!');
        } else {
            return back()->withErrors([
                'email' => 'Erro ao deletar artigo, tente novamente.',
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_list($type)
    {
        $articles = Article::where('active', true)->orderBy('created_at', 'desc')->get();
        $articles_arr = [];

        if ($type != 'all') {
            foreach ($articles as $article) {
                $types = explode(',', $article->type);
                if (in_array($type, $types)) {
                    $articles_arr[] = $article;
                }
            }
        } else {
            $articles_arr = $articles;
        }

        foreach ($articles_arr as $a)
            $a->date = date_format(date_create($a->created_at), 'd/m/Y');

        return response()->json(['articles' => $articles_arr]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_show($id)
    {
        $article = Article::findOrFail($id);
        $article->date = date_format(date_create($article->created_at), 'd/m/Y');
        return response()->json($article);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function api_store(Request $request)
    {
        $validated = $request->validate([
            'user_email' => ['required'],
            'anonymous' => ['required'],
            'title' => ['required'],
            'content' => ['nullable'],
            'image' => ['nullable'],
            'type' => ['required'],
        ]);

        $user = User::where('email', $validated['user_email'])->firstOrFail();
        
        unset($validated['user_email']);

        $validated['user_id'] = $user->id;
        $validated['active'] = true;

        if ($validated['anonymous']) {
            $validated['user_name'] = 'Anônimo';
        } else {
            $validated['user_name'] = $user->name;
        }
        
        if (isset($validated['image']) && $validated['image']) {
            $type = explode(';base64,', $validated['image'])[0];
            $type = explode('/', $type)[1];

            $filename = "article-".time().'.'.$type;
            $path = public_path('images/articles/'.$filename);

            Image::make(file_get_contents($validated['image']))->save($path);  
            $validated['image'] = env('APP_URL').'/images/articles/' . $filename;
        }

        if ($article = Article::create($validated)) {
            $mailData = [
                'title' => $article->title,
                'content' => $article->content,
                'image' => $article->image,
            ];
            Mail::to('contato@medhelping.com.br')->send(new ArticleSended($mailData));

            return response()->json(['success' => true, 'message' => 'Artigo cadastrado com sucesso!', 'id' => $article->id]);
        } else {
            return response()->json(['success' => false, 'message' => 'Erro ao cadastrar artigo, tente novamente.']);
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function api_like(Request $request)
    {
        $validated = $request->validate([
            'article_id' => ['required'],
            'user_email' => ['required'],
        ]);

        $user = User::where('email', $validated['user_email'])->firstOrFail();
        $article = Article::findOrFail($validated['article_id']);
        $author = User::findOrFail($article->user_id);

        $articleLiked = ArticleLike::where(['user_id' => $user->id, 'article_id' => $article->id])->first();
        
        if (!$articleLiked) {
            $article->increment('likes');
            $author->increment('likes');
            ArticleLike::create(['user_id' => $user->id, 'article_id' => $article->id]);
        } else {
            $article->decrement('likes');
            $author->decrement('likes');
            $articleLiked->delete();
        }
        
        return response()->json(['success' => true]);
    }
}
