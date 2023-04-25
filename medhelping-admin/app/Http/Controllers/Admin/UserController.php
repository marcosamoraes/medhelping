<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $users = User::all();
    return view('admin.users.index', compact('users'));
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $user = User::findOrFail($id);
    return view('admin.users.show', compact('user'));
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return view('admin.users.create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => ['nullable'],
      'email' => ['nullable'],
      'age' => ['nullable'],
      'address' => ['nullable'],
      'city' => ['nullable'],
      'college' => ['nullable'],
      'college_year' => ['nullable'],
      'crm' => ['nullable'],
      'occupation_area' => ['nullable'],
      'specialties' => ['nullable'],
      'image' => ['nullable'],
    ]);

    if (User::create($validated)) {
      return redirect(route('admin.users.index'))->with('success', 'Usuário cadastrado com sucesso!');
    } else {
      return back()->withErrors([
        'email' => 'Erro ao cadastrar usuário, tente novamente.',
      ]);
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Client  $client
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    $user = User::findOrFail($id);
    return view('admin.users.edit', compact('user'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Client  $client
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    if ($request->input('action') == 'fileuploader') {
      $validated = $request->validate([
        'image' => ['nullable']
      ]);

      $image = $validated['image'];

      if ($image != '') {
        $filename = explode('.', $image->getClientOriginalName())[0] . '-' . time();
        $filename = $filename . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/users'), $filename);
      }
      return json_encode(['success' => true, 'filename' => env('APP_URL') . '/images/users/' . $filename]);
    }

    $validated = $request->validate([
      'user_name' => ['required'],
      'user_email' => ['nullable'],
      'title' => ['required'],
      'image' => ['nullable'],
      'content' => ['required'],
      'type' => ['required'],
      'active' => ['required'],
    ]);

    $validated['type'] = implode(',', $validated['type']);

    if (User::where('id', $id)->update($validated)) {
      return redirect(route('admin.users.index'))->with('success', 'Artigo editado com sucesso!');
    } else {
      return back()->withErrors([
        'email' => 'Erro ao editar artigo, tente novamente.',
      ])->exceptInput('password');
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Client  $client
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    if (User::where('id', $id)->delete()) {
      return back()->with('success', 'Artigo deletado com sucesso!');
    } else {
      return back()->withErrors([
        'email' => 'Erro ao deletar artigo, tente novamente.',
      ]);
    }
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function api_list($type)
  {
    $users = User::where('active', true)->get();
    $users_arr = [];
    foreach ($users as $user) {
      $types = explode(',', $user->type);
      if (in_array($type, $types)) {
        $users_arr[] = $user;
      }
    }
    foreach ($users_arr as $a)
      $a->date = date_format(date_create($a->created_at), 'd/m/Y H:i:s');

    return response()->json(['users' => $users_arr]);
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function api_show($email)
  {
    $user = User::where('email', $email)->firstOrFail();
    return response()->json($user);
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
      'name' => ['nullable'],
      'email' => ['nullable'],
      'age' => ['nullable'],
      'address' => ['nullable'],
      'city' => ['nullable'],
      'college' => ['nullable'],
      'college_year' => ['nullable'],
      'crm' => ['nullable'],
      'occupation_area' => ['nullable'],
      'specialties' => ['nullable'],
      'image' => ['nullable'],
    ]);

    if (User::updateOrCreate(['email' => $validated['email']], $validated)) {
      return response()->json(['success' => true, 'message' => 'Usuário cadastrado com sucesso!']);
    } else {
      return response()->json(['success' => false, 'message' => 'Erro ao cadastrar usuário, tente novamente.']);
    }
  }
}
