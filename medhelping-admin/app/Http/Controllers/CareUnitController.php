<?php

namespace App\Http\Controllers;

use App\Http\Requests\CareUnitStoreRequest;
use App\Http\Requests\CareUnitUpdateRequest;
use App\Models\CareUnit;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use RealRashid\SweetAlert\Facades\Alert;

class CareUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $careUnits = CareUnit::paginate(50);

        $title = 'Deletar unidade';
        $text = "Você tem certeza que quer deletar esse unidade?";
        confirmDelete($title, $text);

        return view('care-units.index', compact('careUnits'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('care-units.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CareUnitStoreRequest $request)
    {
        try {
            CareUnit::create($request->validated());

            Alert::toast('Unidade cadastrada com sucesso.', 'success');
            return Redirect::route('care-units.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao cadastrar unidade.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CareUnit $careUnit)
    {
        return view('care-units.edit', compact('careUnit'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CareUnitUpdateRequest $request, CareUnit $careUnit)
    {
        try {
            $careUnit->update($request->validated());

            Alert::toast('Unidade editada com sucesso.', 'success');
            return Redirect::route('care-units.index');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            Alert::toast('Falha ao editar unidade.', 'error');
            return back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CareUnit $careUnit)
    {
        $careUnit->delete();
        Alert::toast('Unidade deletada com sucesso.', 'success');
        return back();
    }
}
