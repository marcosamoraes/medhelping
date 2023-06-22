<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    /**
     * Send reset password email
     */
    public function forgot(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status == Password::RESET_LINK_SENT
                    ? response()->json(['message' => __($status)])
                    : response()->json(['message' => __($status)], 500);
    }
}
