<?php

namespace App\Http\Requests;

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
            'title'         => ['string', 'max:255'],
            'category1'     => ['int', 'exists:categories,id'],
            'category2'     => ['nullable', 'int', 'exists:categories,id'],
            'category3'     => ['nullable', 'int', 'exists:categories,id'],
            'description'   => ['nullable', 'string'],
            'image'         => ['nullable', 'file'],
            'image2'        => ['nullable', 'file'],
            'image3'        => ['nullable', 'file'],
        ];
    }
}
