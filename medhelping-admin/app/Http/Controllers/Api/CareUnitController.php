<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CareUnit;

class CareUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $careUnits = CareUnit::orderBy('name', 'ASC')->get()->pluck('name', 'id');

        return response()->json($careUnits, 200);
    }
}
