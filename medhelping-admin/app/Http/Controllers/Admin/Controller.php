<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Article;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('admin')->attempt($credentials, true)) {
            $request->session()->regenerate();
 
            return redirect()->intended(route('admin.dashboard'));
        }
 
        return back()->withErrors([
            'email' => 'E-mail ou senha inválidos.',
        ])->onlyInput('email');
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
     
        $request->session()->invalidate();
     
        $request->session()->regenerateToken();
     
        return redirect(route('admin.login'));
    }

    public function dashboard()
    {
        $qtd_articles = Article::count();

        return view('admin.dashboard', compact('qtd_articles'));
    }

    public function settings()
    {
        return view('admin.settings');
    }

    public function settings_save(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['nullable'],
            'image' => ['nullable', 'image'],
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        if (isset($validated['image'])) {
            $filename = time().'.'.$validated['image']->getClientOriginalExtension();
            $validated['image']->move(public_path('images/admins'), $filename);
            $validated['image'] = 'admins/' . $filename;
        }

        $admin = Auth::user();

        if ($admin->update($validated)) {
            return redirect(route('admin.dashboard'))->with('success', 'Dados editado com sucesso!');
        } else {
            return back()->withErrors([
                'email' => 'Erro ao editar dados, tente novamente.',
            ])->exceptInput('password');
        }
    }
}
