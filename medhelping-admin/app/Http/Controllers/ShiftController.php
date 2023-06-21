<?php

namespace App\Http\Controllers;

use App\Models\CareUnit;
use App\Models\Category;
use App\Models\Shift;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

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
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validated();
        $data['anonymous_publication'] = true;
        Shift::create($data);
        return Redirect::route('shifts.create')->with('status', 'shift-created');
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
    public function update(Request $request, Shift $shift): RedirectResponse
    {
        $shift->update($request->validated());
        return Redirect::route('shifts.edit')->with('status', 'shift-updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();
        return back()->with('status', 'shift-deleted');
    }
}
