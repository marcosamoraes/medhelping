<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // resource for User model with likes, articlesShared, UserAddress relationship, UserInfo relationship
        return [
            'id'                => $this->id,
            'cep'               => $this->cep,
            'address'           => $this->address,
            'number'            => $this->number,
            'complement'        => $this->complement,
            'district'          => $this->district,
            'city'              => $this->city,
            'state'             => $this->state,
        ];
    }
}
