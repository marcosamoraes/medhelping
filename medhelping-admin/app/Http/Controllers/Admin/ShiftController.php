<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Controller;
use App\Models\Shift;
use App\Models\User;
use App\Models\ArticleLike;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\Mail;
use App\Mail\ArticleSended;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_list()
    {
        $shifts = Shift::where('date', '>=', now())->orderBy('created_at', 'desc')->get();

        foreach ($shifts as $s)
            $s->date = date_format(date_create($s->date), 'd/m/Y');

        return response()->json(['shifts' => $shifts]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function api_show($id)
    {
        $shift = Shift::findOrFail($id);
        $shift->date = date_format(date_create($shift->date), 'd/m/Y');
        return response()->json($shift);
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
            'user_email'        => ['required'],
            'unit'              => ['required'],
            'city'              => ['required'],
            'date'              => ['required'],
            'entry_time'        => ['required'],
            'out_time'          => ['required'],
            'value'             => ['nullable'],
            'payment_method'    => ['nullable'],
            'description'       => ['nullable'],
        ]);

        $user = User::where('email', $validated['user_email'])->firstOrFail();

        unset($validated['user_email']);

        $validated['user_id'] = $user->id;
        $validated['user_name'] = $user->name;

        if ($shift = Shift::create($validated)) {
            return response()->json(['success' => true, 'message' => 'Plantão cadastrado com sucesso!', 'id' => $shift->id]);
        } else {
            return response()->json(['success' => false, 'message' => 'Erro ao cadastrar plantão, tente novamente.']);
        }
    }
}
