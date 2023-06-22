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
    public function index()
    {
        $users = User::paginate();
        return view('users.index', compact('users'));
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
}
