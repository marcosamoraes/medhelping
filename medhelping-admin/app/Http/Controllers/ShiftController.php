<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShiftStoreRequest;
use App\Http\Requests\ShiftUpdateRequest;
use App\Models\CareUnit;
use App\Models\Category;
use App\Models\Shift;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use RealRashid\SweetAlert\Facades\Alert;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shifts = Shift::paginate();

        $title = 'Deletar plantão';
        $text = "Você tem certeza que quer deletar esse plantão?";
        confirmDelete($title, $text);

        return view('shifts.index', compact('shifts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $careUnits = CareUnit::pluck('name', 'id')->toArray();
        return view('shifts.create', compact('careUnits'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShiftStoreRequest $request)
    {
        try {
            $data = $request->validated();
            $data['anonymous_publication'] = true;
            Shift::create($data);
    
            Alert::toast('Plantão cadastrado com sucesso.', 'success');
            return Redirect::route('shifts.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Erro ao cadastrar plantão.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shift $shift)
    {
        $careUnits = CareUnit::pluck('name', 'id')->toArray();
        return view('shifts.edit', compact('shift', 'careUnits'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShiftUpdateRequest $request, Shift $shift)
    {
        try {
            $shift->update($request->validated());
            Alert::toast('Plantão atualizado com sucesso.', 'success');
            return Redirect::route('shifts.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Erro ao atualizar plantão.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();
        Alert::toast('Plantão deletado com sucesso.', 'success');
        return back();
    }
}
