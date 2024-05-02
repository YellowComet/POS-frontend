<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use App\Http\Requests\StoreCiudadRequest;
use App\Http\Requests\UpdateCiudadRequest;
use Illuminate\Http\JsonResponse;


class CiudadController extends Controller
{
    /**
     * @return JsonResponse
     */
    final public function index(int $provincia_id):JsonResponse
    {
        $ciudades = ((new Ciudad())->getCiudadesByProvincias($provincia_id));
        return response()->json($ciudades);
    }

}
