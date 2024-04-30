<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;


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

    /**
     * @param array $input
     * @return LengthAwarePaginator
     */
    final public function getAllCategories(array $input):LengthAwarePaginator
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
        return $query->with('user:id,name')->paginate($per_page);
    }

    /**
     * @return Collection
     */
    final public function getCategoryIdAndName():Collection
    {
        return self::query()->select('id','name')->get();
    }

    /**
     * @return BelongsTo
     */
    final public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
