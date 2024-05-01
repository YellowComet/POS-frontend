<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;

class SubCategory extends Model
{
    use HasFactory;

    public const IMAGE_UPLOAD_PATH = 'images/uploads/sub_category/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/sub_category_thumb/';

    protected $fillable = ['name', 'category_id', 'slug', 'serial', 'status', 'description', 'photo', 'user_id'];

    /**
     * @param array $input
     * @return Builder|Model
     */
    final public function storeSubCategory(array $input):Builder|Model
    {
        return self::query()->create($input);
    }

    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function getAllSubCategories(array $input):LengthAwarePaginator
    {
        $per_page = $input['per_page'] ?? 5;
        $direction = $input['direction'] ?? 'asc';
        $query = self::query();

        if(!empty($input['search'])){
            $query->where('name','like','%'. $input['search'] .'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $direction);
        }
        return $query->with(['category:id,name'])->paginate($per_page);
    }

    /**
     * @return BelongsTo
     */
    final public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

}
