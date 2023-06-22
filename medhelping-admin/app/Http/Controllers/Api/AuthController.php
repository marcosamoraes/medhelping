<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Register user
     */
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|unique:users,email',
                'password' => 'required|confirmed',
            ]);

            $user = User::create($validated);
            $token = $this->createToken($user);
        
            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Falha ao cadastrar nova conta, tente novamente mais tarde.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Login user and create token
     */
    public function login(Request $request)
    {
        $auth = Auth::guard('users');
        if ($auth->attempt(['email' => $request->email, 'password' => $request->password, 'active' => true])) {
            $user = $auth->user();

            $token = $this->createToken($user);

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }

        return response()->json([
            'message' => 'Credenciais inválidas.',
        ], 401);
    }

    /**
     * Get the authenticated User
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Create a new token
     */
    private function createToken(User $user)
    {
        $token = $user->createToken(env('APP_KEY'));
        return $token->plainTextToken;
    }
}