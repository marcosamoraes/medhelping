<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            'id'                    => $this->id,
            'name'                  => $this->name,
            'email'                 => $this->email,
            'whatsapp'              => $this->whatsapp,
            'image'                 => $this->image ? Storage::url($this->image) : null,
            'likes'                 => $this->likes,
            'articles_shared'       => $this->articles_shared,
            'articles_commented'    => $this->articles_commented,
            'quantity_articles'     => $this->quantity_articles,
            'active'                => $this->active,
            'created_at'            => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at'            => $this->updated_at->format('d/m/Y H:i:s'),

            'address'               => $this->address ? new UserAddressResource($this->address) : null,
            'infos'                 => $this->infos ? new UserInfoResource($this->infos) : null,
        ];
    }
}
