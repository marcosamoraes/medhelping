<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateAddressRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'cep'           => ['required', 'string'],
            'address'       => ['required', 'string'],
            'number'        => ['required', 'string'],
            'complement'    => ['nullable', 'string'],
            'area'          => ['required', 'string'],
            'city'          => ['required', 'string'],
            'state'         => ['required', 'string'],
        ];
    }
}
