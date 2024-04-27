<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Category extends Model
{
    public const IMAGE_UPLOAD_PATH = 'images/uploads/category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/category_thumb/';

    use HasFactory;

    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'photo', 'user_id'];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeCategory(array $input):Builder|Model
    {
        return self::query()->create($input);
    }

    final public function getAllCategories()
    {
        return self::query()->with('user:id,name')->orderBy('serial', 'asc')->get();
    }

    /**
     * @return BelongsTo
     */
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
