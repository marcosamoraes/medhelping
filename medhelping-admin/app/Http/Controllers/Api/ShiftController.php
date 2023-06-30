<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ShiftStoreRequest;
use App\Http\Requests\Api\ShiftUpdateRequest;
use App\Http\Resources\Api\ShiftResource;
use App\Models\Shift;
use Exception;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shifts = Shift::when($request->search, function ($query, $search) {
                $query->orWhere('title', 'REGEXP', $search);
                $query->orWhere('city', 'REGEXP', $search);
                $query->orWhereHas('users', function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search);
                });
                $query->orWhereHas('careUnit', function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search);
                });
            })
            ->latest()
            ->paginate($request->per_page ?? 10);

        return response()->json([
            'data'          => ShiftResource::collection($shifts),
            'per_page'      => $shifts->perPage(),
            'current_page'  => $shifts->currentPage(),
            'last_page'     => $shifts->lastPage(),
            'total'         => $shifts->total(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShiftStoreRequest $request)
    {
        try {
            $validated = $request->validated();

            $validated['user_id'] = $request->user()->id;

            $shift = Shift::create($validated);

            return response()->json([
                'message'   => 'Plantão criado com sucesso',
                'shift'     => new ShiftResource($shift),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao criar plantão',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Shift $shift)
    {
        return response()->json([
            'shift' => new ShiftResource($shift),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShiftUpdateRequest $request, Shift $shift)
    {
        try {
            $validated = $request->validated();

            $shift->update($validated);

            return response()->json([
                'message'   => 'Plantão atualizado com sucesso',
                'shift'     => new ShiftResource($shift),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao atualizar plantão',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        try {
            $shift->delete();

            return response()->json([
                'message'   => 'Plantão excluído com sucesso',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao excluir plantão',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Comment the specified resource from storage.
     */
    public function comment(Request $request, Shift $shift)
    {
        try {
            $validated = $request->validate([
                'message'               => ['required', 'string'],
                'anonymous_publication' => ['required', 'boolean'],
                'comment_id'            => ['nullable', 'exists:comments,id'],
            ]);

            $data = [
                'user_id'               => $request->user()->id,
                'message'               => $validated['message'],
                'anonymous_publication' => $validated['anonymous_publication'],
                'type'                  => 'shift',
            ];

            if (isset($validated['comment_id'])) {
                $data['comment_id'] = $validated['comment_id'];
            }

            $shift->comments()->create($data);

            return response()->json([
                'message'   => 'Comentário criado com sucesso',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao criar comentário',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
