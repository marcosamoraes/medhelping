<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContactStoreRequest;
use App\Models\Contact;
use Exception;

class ContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactStoreRequest $request)
    {
        try {
            $validated = $request->validated();

            $validated['user_id'] = $request->user()->id;

            Contact::create($validated);

            return response()->json([
                'message'   => 'Mensagem enviada com sucesso. Em breve entraremos em contato.',
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message'   => 'Falha ao enviar mensagem',
                'error'     => $e->getMessage(),
            ], 500);
        }
    }
}
