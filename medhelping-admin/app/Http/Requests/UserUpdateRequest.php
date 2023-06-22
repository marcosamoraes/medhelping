<?php

namespace App\Http\Requests;

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
            'active'                => ['boolean'],
            
            'address'               => ['nullable'],
            'address.cep'           => ['string'],
            'address.address'       => ['string'],
            'address.number'        => ['string'],
            'address.complement'    => ['nullable', 'string'],
            'address.area'          => ['string'],
            'address.city'          => ['string'],
            'address.state'         => ['string'],

            'infos'                 => ['nullable'],
            'infos.age'             => ['nullable', 'int'],
            'infos.faculty'         => ['nullable', 'string'],
            'infos.faculty_year'    => ['nullable', 'int'],
            'infos.crm'             => ['nullable', 'string'],
            'infos.occupation_area' => ['nullable', 'string'],
            'infos.specialties'     => ['nullable', 'string'],
            'infos.link_facebook'   => ['nullable', 'string'],
            'infos.link_instagram'  => ['nullable', 'string'],
            'infos.link_twitter'    => ['nullable', 'string'],
            'infos.link_doctoralia' => ['nullable', 'string'],
        ];
    }
}
