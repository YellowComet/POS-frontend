<?php

namespace App\Http\Controllers;

use App\Models\CA;
use App\Http\Requests\StoreCARequest;
use App\Http\Requests\UpdateCARequest;
use Illuminate\Http\JsonResponse;

class CAController extends Controller
{
    /**
     * @return JsonResponse
     */
    final public function index():JsonResponse
    {
        $cas = (new CA())->getCAsList();
        return response()->json($cas);
    }

}
