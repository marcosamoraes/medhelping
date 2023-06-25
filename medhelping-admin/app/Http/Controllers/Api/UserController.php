<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserUpdateAddressRequest;
use App\Http\Requests\Api\UserUpdatePasswordRequest;
use App\Http\Requests\Api\UserUpdateProfileRequest;
use App\Http\Requests\Api\UserUpdateRequest;
use App\Http\Resources\Api\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'user'  => new UserResource($user),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        try {
            $validated = $request->validated();

            $user->update($validated);

            return response()->json([
                'message'   => 'Usuário atualizado com sucesso',
                'user'      => new UserResource($user),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar usuário',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePassword(UserUpdatePasswordRequest $request, User $user)
    {
        try {
            $validated = $request->validated();

            $user->update($validated);

            return response()->json([
                'message'   => 'Senha atualizada com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar senha',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProfile(UserUpdateProfileRequest $request, User $user)
    {
        try {
            $validated = $request->validated();

            if ($user->infos->count() === 0) {
                $user->infos()->create($validated);
            } else {
                $user->infos()->update($validated);
            }

            return response()->json([
                'message'   => 'Perfil atualizado com sucesso',
                'user'      => new UserResource($user),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar perfil',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateAddress(UserUpdateAddressRequest $request, User $user)
    {
        try {
            $validated = $request->validated();

            if ($user->address->count() === 0) {
                $user->address()->create($validated);
            } else {
                $user->address()->update($validated);
            }

            return response()->json([
                'message'   => 'Endereço atualizado com sucesso',
                'user'      => new UserResource($user),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar endereço',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateAvatar(Request $request, User $user)
    {
        try {
            $request->validate([
                'image' => ['required', 'file'],
            ]);

            if ($user->image) {
                Storage::delete($user->image);
            }
            $data['image'] = $request->file('image')->store('users');

            $user->save();

            return response()->json([
                'message'   => 'Avatar atualizado com sucesso',
                'user'      => new UserResource($user),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar avatar',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }
}
