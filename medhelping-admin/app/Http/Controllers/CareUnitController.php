<?php

namespace App\Http\Controllers;

use App\Models\CareUnit;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CareUnit $careUnit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CareUnit $careUnit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CareUnit $careUnit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CareUnit $careUnit)
    {
        //
    }
}
