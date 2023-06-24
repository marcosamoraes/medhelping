<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anonymous_publication' => $this->anonymous_publication,
            'message' => $this->message,
            'quantity_likes' => $this->quantityLikes,
            'user_liked' => $this->userLiked,
            'is_the_owner' => $this->isTheOwner,
            'created_at' => $this->created_at,

            'user' => new UserResource($this->user),
            'nodeComments' => CommentResource::collection($this->nodeComments),
        ];
    }
}
