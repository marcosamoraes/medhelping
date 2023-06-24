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
            $userAlreadyLiked = $comment->likes()->where('user_id', $request->user()->id)->first();

            if ($userAlreadyLiked) {
                $comment->likes()->where('user_id', $request->user()->id)->delete();

                return response()->json([
                    'message'   => 'Comentário descurtido com sucesso',
                ], 200);
            }

            $comment->likes()->create([
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        try {
            $comment->nodeComments()->delete();
            $comment->delete();

            return response()->json([
                'message'   => 'Comentário excluído com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao excluir comentário',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
