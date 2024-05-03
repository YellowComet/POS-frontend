<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Address extends Model
{
    use HasFactory;

    protected $fillable = ['address', 'addressable_id', 'addressable_type', 'c_a_s_id','provincias_id','ciudads_id', 'status', 'type', 'landmark'];
    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;

    const SUPPLIER_ADDRESS = 1;
    const CUSTOMER_PERMANENT_ADDRESS = 2;
    const CUSTOMER_PRESENT_ADDRESS = 3;

    /**
     * @param array $input
     * @return array
     */
    final public function prepareData(array $input):array
    {
        $address['address'] = $input['address'] ?? '';
        $address['c_a_s_id'] = $input['ca_id'] ?? '';
        $address['provincias_id'] = $input['provincia_id'] ?? '';
        $address['ciudads_id'] = $input['ciudad_id'] ?? '';
        $address['landmark'] = $input['landmark'] ?? '';
        $address['status'] = self::STATUS_ACTIVE;
        $address['type'] = self::SUPPLIER_ADDRESS;

        return $address;
    }

    /**
     * @return MorphTo
     */
    final public function addressable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     *@return BelongsTo
     */
    final public function c_a_s():BelongsTo
    {
        return $this->belongsTo(CA::class);
    }

    /**
     *@return BelongsTo
     */
    final public function provincias():BelongsTo
    {
        return $this->belongsTo(Provincia::class);
    }

    /**
     *@return BelongsTo
     */
    final public function ciudads():BelongsTo
    {
        return $this->belongsTo(Ciudad::class);
    }
}
