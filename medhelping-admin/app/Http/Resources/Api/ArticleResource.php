<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'is_the_owner'          => $this->isTheOwner,
            'anonymous_publication' => $this->anonymous_publication,
            'title'                 => $this->title,
            'image'                 => $this->image ? Storage::url($this->image) : null,
            'description'           => $this->description,
            'quantity_shared'       => $this->quantity_shared,
            'likes'                 => $this->likes,
            'userLiked'             => $this->userLiked,
            'created_at'            => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at'            => $this->updated_at->format('d/m/Y H:i:s'),

            'user'                  => $this->user ? new UserResource($this->user) : null,
            'categories'            => CategoryResource::collection($this->categories),
            'comments'              => CommentResource::collection($this->comments),

        ];
    }
}
