<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['details', 'email', 'logo', 'name', 'phone', 'status', 'user_id'];
    public const STATUS_ACTIVE = 1;
    public const STATUS_INACTIVE = 0;

    public const LOGO_WIDTH = 800;
    public const LOGO_HEIGHT = 800;
    public const LOGO_THUMB_WIDTH = 200;
    public const LOGO_THUMB_HEIGHT = 200;
    public const IMAGE_UPLOAD_PATH = 'images/uploads/supplier/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/supplier_thumb/';

    /**
     * @param array $input
     * @param  $auth
     * @return array
     */
    final public function prepareData(array $input, $auth):array
    {
        $supplier['details'] = $input['details'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = $input['status'] ?? '';
        $supplier['user_id'] = $auth->id();

        return $supplier;
    }

    /**
     * @return MorphOne
     */
    final public function address():MorphOne
    {
        return $this->morphOne(Address::class,'addressable');
    }
}