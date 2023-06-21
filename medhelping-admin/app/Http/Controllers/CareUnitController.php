<?php

namespace App\Http\Controllers;

use App\Models\CareUnit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CareUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $careUnits = CareUnit::paginate();

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
    public function store(Request $request): RedirectResponse
    {
        CareUnit::create($request->validated());
        return Redirect::route('care-units.create')->with('status', 'care-unit-created');
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
    public function update(Request $request, CareUnit $careUnit): RedirectResponse
    {
        $careUnit->update($request->validated());
        return Redirect::route('care-units.edit')->with('status', 'care-unit-updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CareUnit $careUnit)
    {
        $careUnit->delete();
        return back()->with('status', 'care-unit-deleted');
    }
}
