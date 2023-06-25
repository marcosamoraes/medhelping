<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
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
            'age'               => $this->age,
            'faculty'           => $this->faculty,
            'faculty_year'      => $this->faculty_year,
            'crm'               => $this->crm,
            'occupation_area'   => $this->occupation_area,
            'specialties'       => $this->specialties,
            'link_facebook'     => $this->link_facebook,
            'link_instagram'    => $this->link_instagram,
            'link_twitter'      => $this->link_twitter,
            'link_doctoralia'   => $this->link_doctoralia,
        ];
    }
}
