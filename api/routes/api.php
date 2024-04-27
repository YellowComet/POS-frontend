<?php

use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware'=> 'auth:sanctum'], static function () {
    Route::post('logout', [AuthController::class,'logout']);
    Route::apiResource('category', CategoryController::class);
});
