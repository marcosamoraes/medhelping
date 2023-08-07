<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use RealRashid\SweetAlert\Facades\Alert;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sort = $request->sort ?? null;
        $users = User::when($sort, function ($query, $sort) {
            if ($sort === 'more_likes') {
                $query->addSelect(['qtd_likes' => function ($query) {
                    $query->selectRaw('count(*)')
                        ->from('article_likes')
                        ->whereColumn('article_likes.user_id', 'users.id');
                }])->orderByDesc('qtd_likes');
            }
            if ($sort === 'more_comments') {
                $query->addSelect(['qtd_comments' => function ($query) {
                    $query->selectRaw('count(*)')
                        ->from('comments')
                        ->whereColumn('comments.user_id', 'users.id');
                }])->orderByDesc('qtd_comments');
            }
        })->paginate(50);

        return view('users.index', compact('users', 'sort'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        try {
            $user->update($request->validated());
            $user->address()->update($request->address);
            $user->infos()->update($request->infos);
            Alert::toast('Usuário atualizado com sucesso.', 'success');
            return Redirect::route('users.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Erro ao atualizar usuário.', 'error');
            return back()->withInput();
        }
    }

    public function active(User $user)
    {
        try {
            $user->update(['active' => true]);
            Alert::toast('Usuário ativado com sucesso.', 'success');
            return Redirect::route('users.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Erro ao ativar usuário.', 'error');
            return back()->withInput();
        }
    }

    public function inactive(User $user)
    {
        try {
            $user->update(['active' => false]);
            Alert::toast('Usuário desativado com sucesso.', 'success');
            return Redirect::route('users.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Erro ao desativar usuário.', 'error');
            return back()->withInput();
        }
    }
}
