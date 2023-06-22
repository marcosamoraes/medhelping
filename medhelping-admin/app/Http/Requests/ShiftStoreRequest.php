<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShiftStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'city'              => ['string', 'max:255'],
            'care_unit_id'      => ['nullable', 'int', 'exists:care_units,id'],
            'date'              => ['date'],
            'entry_time'        => ['string'],
            'out_time'          => ['string'],
            'value'             => ['nullable', 'string'],
            'payment_method'    => ['nullable', 'string'],
            'description'       => ['nullable', 'string'],
        ];
    }
}
