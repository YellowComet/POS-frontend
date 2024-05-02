<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class CA extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return Builder|Collection
     */
    final public function getCAsList():Builder|Collection
    {
        return self::query()->select('id','name')->get();
    }
}
