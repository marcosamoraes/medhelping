<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ArticleStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title'                 => ['string', 'max:255'],
            'description'           => ['nullable', 'string'],
            'image'                 => ['nullable', 'string'],
            'image2'                => ['nullable', 'string'],
            'image3'                => ['nullable', 'string'],
            'categories'            => ['required', 'array', 'min:1', 'max:3'],
            'categories.*'          => ['nullable', 'integer', 'exists:categories,id'],
            'anonymous_publication' => ['required', 'boolean'],
        ];
    }
}
