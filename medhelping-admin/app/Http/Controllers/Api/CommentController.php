<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Like the specified resource from storage.
     */
    public function like(Request $request, Comment $comment)
    {
        try {
            $userAlreadyLiked = $comment->commentLikes()->where('user_id', $request->user()->id)->first();
            if ($userAlreadyLiked) {
                $comment->articleLikes()->where('user_id', $request->user()->id)->delete();

                return response()->json([
                    'message'   => 'Comentário descurtido com sucesso',
                ], 200);
            }
            
            $comment->articleLikes()->create([
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'message'   => 'Comentário curtido com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao curtir comentário',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
