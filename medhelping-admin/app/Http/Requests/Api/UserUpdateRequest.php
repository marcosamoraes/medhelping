<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name'                  => ['string', 'max:255'],
            'email'                 => ['string', 'email', 'max:255'],
            'whatsapp'              => ['string', 'max:255'],

            'address.cep'           => ['nullable', 'string'],
            'address.address'       => ['required_with:address.cep,', 'string'],
            'address.number'        => ['required_with:address.cep', 'string'],
            'address.complement'    => ['nullable', 'string'],
            'address.district'      => ['required_with:address.cep', 'string'],
            'address.city'          => ['required_with:address.cep', 'string'],
            'address.state'         => ['required_with:address.cep', 'string'],
        ];
    }
}
