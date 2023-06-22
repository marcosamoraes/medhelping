<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
            'data'  => $user,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'name'      => 'required|string',
                'email'     => 'required|email|unique:users,email,' . $user->id,
                'whatsapp'  => 'nullable|string',
            ]);

            $user->update($validated);

            return response()->json([
                'message'   => 'Usuário atualizado com sucesso',
                'user'      => $user,
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
    public function updatePassword(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'password'  => 'required|string|min:8|confirmed',
            ]);

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
    public function updateProfile(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'age'             => ['nullable', 'int'],
                'faculty'         => ['nullable', 'string'],
                'faculty_year'    => ['nullable', 'int'],
                'crm'             => ['nullable', 'string'],
                'occupation_area' => ['nullable', 'string'],
                'specialties'     => ['nullable', 'string'],
                'link_facebook'   => ['nullable', 'string'],
                'link_instagram'  => ['nullable', 'string'],
                'link_twitter'    => ['nullable', 'string'],
                'link_doctoralia' => ['nullable', 'string'],
            ]);

            if ($user->infos->count() === 0) {
                $user->infos()->create($validated);
            } else {
                $user->infos()->update($validated);
            }

            return response()->json([
                'message'   => 'Perfil atualizado com sucesso',
                'user'      => $user,
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
    public function updateAddress(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'cep'           => ['nullable', 'string'],
                'address'       => ['nullable', 'string'],
                'number'        => ['nullable', 'string'],
                'complement'    => ['nullable', 'string'],
                'area'          => ['nullable', 'string'],
                'city'          => ['nullable', 'string'],
                'state'         => ['nullable', 'string'],
            ]);

            if ($user->address->count() === 0) {
                $user->address()->create($validated);
            } else {
                $user->address()->update($validated);
            }
            
            return response()->json([
                'message'   => 'Endereço atualizado com sucesso',
                'user'      => $user,
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
            $validated = $request->validate([
                'image' => ['required', 'file'],
            ]);

            if ($user->image) {
                Storage::delete($user->image);
            }
            $data['image'] = $request->file('image')->store('users');

            $user->save();

            return response()->json([
                'message'   => 'Avatar atualizado com sucesso',
                'user'      => $user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Erro ao atualizar avatar',
                'error'     => $e->getMessage(),
            ], 400);
        }
    }
}
