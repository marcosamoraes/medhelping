<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'age'             => ['nullable', 'int'],
            'faculty'         => ['nullable', 'string'],
            'faculty_year'    => ['nullable', 'int'],
            'crm'             => ['nullable', 'string'],
            'occupation_area' => ['nullable', 'string'],
            'specialties'     => ['nullable', 'string'],
            'link_facebook'   => ['nullable', 'string'],
            'link_instagram'  => ['nullable', 'string'],
            'link_twitter'    => ['nullable', 'string'],
            'link_doctoralia' => ['nullable', 'string'],
        ];
    }
}
