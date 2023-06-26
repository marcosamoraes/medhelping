<?php

namespace App\Http\Resources\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ShiftResource extends JsonResource
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
            'city'                  => $this->city,
            'date'                  => Carbon::parse($this->date)->format('d/m/Y'),
            'entry_time'            => Carbon::parse($this->entry_time)->format('H:i'),
            'out_time'              => Carbon::parse($this->out_time)->format('H:i'),
            'value'                 => $this->value,
            'payment_method'        => $this->payment_method,
            'description'           => $this->description,
            'created_at'            => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at'            => $this->updated_at->format('d/m/Y H:i:s'),

            'care_unit'             => new CareUnitResource($this->careUnit),
            'user'                  => $this->user ? new UserResource($this->user) : null,
        ];
    }
}
