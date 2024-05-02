<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class Ciudad extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return Builder|Collection
     */
    final public function getCiudadesByProvincias(int $provincia_id):Builder|Collection
    {
        return self::query()->select('id', 'name')->where('provincias_id', $provincia_id)->get();
    }

}
