<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use App\Http\Requests\StoreProvinciaRequest;
use App\Http\Requests\UpdateProvinciaRequest;
use Illuminate\Http\JsonResponse;

class ProvinciaController extends Controller
{
    /**
     * @return JsonResponse
     */
    final public function index(int $ca_id):JsonResponse
    {
        $provincias = (new Provincia())->getProvinciasByCA($ca_id);
        return response()->json($provincias);
    }

}
