<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "address"=> $this->address,
            "landmark"=> $this->landmark,
            "c_a_s"=> $this->c_a_s?->name,
            "provincias"=> $this->provincias?->name,
            "ciudads"=> $this->ciudads?->name,

        ];
    }
}
