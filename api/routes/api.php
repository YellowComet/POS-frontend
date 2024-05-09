<?php

use \App\Http\Controllers\AuthController;
use App\Http\Controllers\CAController;
use \App\Http\Controllers\CategoryController;
use App\Http\Controllers\CiudadController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\SupplierController;
use App\Manager\ScriptManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('test', [ScriptManager::class, 'getLocationData']);

Route::post('login', [AuthController::class, 'login']);

Route::get('cas', [CAController::class, 'index']);
Route::get('provincias/{ca_id}', [ProvinciaController::class, 'index']);
Route::get('ciudades/{provincia_id}', [CiudadController::class, 'index']);


Route::group(['middleware'=> 'auth:sanctum'], static function () {
    Route::post('logout', [AuthController::class,'logout']);
    Route::get('get-category-list', [CategoryController::class, 'get_category_list']);
    Route::get('get-subcategory-list/{provincia_id}', [SubCategoryController::class, 'get_subcategory_list']);
    Route::get('get-subcategory-list2', [SubCategoryController::class, 'get_subcategory_list2']);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('sub-category', SubCategoryController::class);
    Route::apiResource('supplier', SupplierController::class);
});
