<?php

use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ImovelController;
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

Route::post('/login', [UserController::class, 'login']);

Route::middleware(CheckToken::class)->group(function () {
    Route::middleware(CheckAdmin::class)->group(function () {

        Route::prefix('user')->group(function () {
            // Define routes you want to group here
            Route::get('/', [UserController::class, 'getUsers']);
            Route::get('/{id}', [UserController::class, 'getUser']);
            Route::post('/', [UserController::class, 'createUser']);
            Route::put('/{id}', [UserController::class, 'updateUser']);
            Route::delete('/{id}', [UserController::class, 'deleteUser']);
        });
    });
    Route::prefix('imovel')->group(function () {
        // Define routes you want to group here
        Route::get('/', [ImovelController::class, 'getImoveis']);
        Route::get('/{id}', [ImovelController::class, 'getImovel']);
        Route::post('/', [ImovelController::class, 'createImovel']);
        Route::post('/addVideo/{id}', [ImovelController::class, 'addVideo']);
        Route::get('/getVideo/{id}', [ImovelController::class, 'getVideo']);
        Route::put('/{id}', [ImovelController::class, 'updateImovel']);
        Route::delete('/{id}', [ImovelController::class, 'deleteImovel']);
    });
    Route::prefix('imagem')->group(function () {
        Route::get('/{id}', [ImagesController::class, 'getImage']);
        Route::delete('/{id}', [ImagesController::class, 'deleteImagem']);
        Route::post('/imovel/{id_imovel}', [ImagesController::class, 'addImagem']);
    });
});
