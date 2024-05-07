<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckToken;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/cria_usuario', [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(CheckToken::class, CheckAdmin::class)->group(function () {
    Route::prefix('user')->group(function () {
        // Define routes you want to group here
        Route::post('/', [UserController::class, 'createUser']);
    });
});
