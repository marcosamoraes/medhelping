<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Controller;
use App\Models\Article;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\User;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($article_id)
    {
        $comemnts = Comment::where('article_id', $article_id)->get();
        return view('admin.comemnts.index', compact('comemnts'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        if (Comment::where('id', $id)->delete()) {
            Comment::where('comment_id', $id)->delete();
            return back()->with('success', 'Comentário deletado com sucesso!');
        } else {
            return back()->withErrors([
                'email' => 'Erro ao deletar comentário, tente novamente.',
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_list($article_id)
    {
        $comments = Comment::where('article_id', $article_id)->whereNull('comment_id')->get();

        foreach ($comments as $comment) {
            if ($comment->user_name != 'Anônimo')
                $comment->user_image = $comment->user->image;
            else
                $comment->user_image = env('APP_URL') . '/images/admins/default.png';

            $comment->user_email = $comment->user->email;
            $comment->date = date_format(date_create($comment->created_at), 'd/m/Y');

            $comment->replies = $comment->reply_comments;
            foreach ($comment->replies as $reply) {
                    if ($reply->user_name != 'Anônimo')
                    $reply->user_image = $reply->user->image;
                else
                    $reply->user_image = env('APP_URL') . '/images/admins/default.png';

                $reply->user_email = $reply->user->email;
                $reply->date = date_format(date_create($reply->created_at), 'd/m/Y');
            }
        }

        return response()->json(['comments' => $comments]);
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
            'user_email' => 'required',
            'article_id' => 'required',
            'comment_id' => 'nullable',
            'anonymous' => 'nullable',
            'message' => 'required'
        ]);

        $user = User::where('email', $validated['user_email'])->firstOrFail();

        unset($validated['user_email']);

        $validated['user_id'] = $user->id;

        if (isset($validated['anonymous'])) {
            $validated['user_name'] = 'Anônimo';
        } else {
            $validated['user_name'] = $user->name;
        }

        unset($validated['anonymous']);

        if ($comment = Comment::create($validated)) {
            return response()->json(['success' => true, 'message' => 'Comentário cadastrado com sucesso!', 'id' => $validated['article_id']]);
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
            'comment_id' => ['required'],
            'user_email' => ['required'],
        ]);

        $user = User::where('email', $validated['user_email'])->firstOrFail();
        $comment = Comment::findOrFail($validated['comment_id']);
        $article = Article::findOrFail($comment->article_id);
        $author = User::findOrFail($article->user_id);

        $commentLiked = CommentLike::where(['user_id' => $user->id, 'comment_id' => $comment->id])->first();

        if (!$commentLiked) {
            $comment->increment('likes');
            $author->increment('likes');
            CommentLike::create(['user_id' => $user->id, 'comment_id' => $comment->id]);
        } else {
            $comment->decrement('likes');
            $author->decrement('likes');
            $commentLiked->delete();
        }

        return response()->json(['success' => true, 'id' => $comment->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function api_destroy($id)
    {
        if (Comment::where('id', $id)->delete()) {
            Comment::where('comment_id', $id)->delete();
            return response()->json(['success' => true, 'id' => $id]);
        } else {
            return response()->json(['success' => false]);
        }
    }
}
