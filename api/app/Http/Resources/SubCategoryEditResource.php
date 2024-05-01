<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Manager\ImagesManager;
use App\Models\SubCategory;
/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $category
 * @property mixed $slug
 * @property mixed $description
 * @property mixed $serial
 * @property mixed $status
 * @property mixed $photo
 */
class SubCategoryEditResource extends JsonResource
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
            "name"=> $this->name,
            'category_name'=> $this->category?->name,
            "slug"=> $this->slug,
            'description'=> $this->description,
            'serial'=> $this->serial,
            'status'=> $this->status,
            'photo_preview'=> ImagesManager::prepareImageUrl(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $this->photo),
        ];
    }
}
