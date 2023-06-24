<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'anonymous_publication' => $this->anonymous_publication,
            'title'                 => $this->title,
            'image'                 => $this->image,
            'description'           => $this->description,
            'quantity_shared'       => $this->quantity_shared,
            'likes'                 => $this->likes,
            'created_at'            => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at'            => $this->updated_at->format('d/m/Y H:i:s'),

            'categories'            => CategoryResource::collection($this->categories),

            $this->when($this->user, function () {
                return [
                    'user' => new UserResource($this->user),
                ];
            }),
        ];
    }
}
