<?php

namespace App\Http\Requests\Api;

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
            'city'              => ['required', 'string', 'max:255'],
            'care_unit_id'      => ['required', 'int', 'exists:care_units,id'],
            'date'              => ['required', 'date'],
            'entry_time'        => ['required', 'date_format:H:i'],
            'out_time'          => ['required', 'date_format:H:i'],
            'value'             => ['nullable', 'string'],
            'payment_method'    => ['nullable', 'string'],
            'description'       => ['nullable', 'string'],
        ];
    }
}
