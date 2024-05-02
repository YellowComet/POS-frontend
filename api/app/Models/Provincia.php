<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class Provincia extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * @return Builder|Collection
     */
    final public function getProvinciasByCA(int $ca_id):Builder|Collection
    {
        return self::query()->select('id', 'name')->where('c_a_s_id', $ca_id)->get();
    }

}
