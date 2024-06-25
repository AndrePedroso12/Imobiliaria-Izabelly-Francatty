<?php

use App\Http\Controllers\EmpreendimentoController;
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

Route::prefix('user')->group(function () {
    Route::middleware(CheckToken::class)->group(function () {
        Route::get('/', [UserController::class, 'getUsers']);
        Route::get('/{id}', [UserController::class, 'getUser']);
        Route::put('/changePassword', [UserController::class, 'changePassword']);

        Route::middleware(CheckAdmin::class)->group(function () {
            Route::post('/', [UserController::class, 'createUser']);
            Route::put('/{id}', [UserController::class, 'updateUser']);
            Route::delete('/{id}', [UserController::class, 'deleteUser']);
        });
    });
});

Route::middleware(CheckToken::class)->group(function () {
    Route::prefix('imovel')->group(function () {
        Route::post('/', [ImovelController::class, 'createImovel']);
        Route::post('/addVideo/{id}', [ImovelController::class, 'addVideo']);
        Route::put('/{id}', [ImovelController::class, 'updateImovel']);
        Route::delete('/{id}', [ImovelController::class, 'deleteImovel']);
    });
    Route::prefix('imagem')->group(function () {
        Route::delete('/{id}', [ImagesController::class, 'deleteImagem']);
        Route::post('/imovel/{id_imovel}', [ImagesController::class, 'addImagem']);
        Route::post('/newMainImage/{id}', [ImagesController::class, 'changeMainImage']);
    });
});

Route::prefix('imovel')->group(function () {
    Route::get('/admin', [ImovelController::class, 'getImoveisAdmin']);
    Route::get('/admin/{id}', [ImovelController::class, 'getImovelAdminById']);
    Route::get('/home', [ImovelController::class, 'getImoveisHome']);
    Route::get('/{id}', [ImovelController::class, 'getImovel']);
    Route::get('/getVideo/{id}', [ImovelController::class, 'getVideo']);
});

Route::prefix('imagem')->group(function () {
    Route::get('/filename/{id}', [ImagesController::class, 'getImageByFileName']);
    Route::get('/{id}', [ImagesController::class, 'getImage']);

    Route::get('/', [ImagesController::class, 'getAllImages']);
});

Route::prefix('empreendimento')->group(function () {
    Route::middleware(CheckToken::class)->group(function () {
        Route::post('/', [EmpreendimentoController::class, 'createEmpreendimentoById']);
        Route::post('/{id}', [EmpreendimentoController::class, 'updateEmpreendimentoById']);
        Route::delete('/{id}', [EmpreendimentoController::class, 'deleteEmpreendimentoById']);
    });
    Route::get('/', [EmpreendimentoController::class, 'getAllEmpreendimentos']);
    Route::get('/{id}', [EmpreendimentoController::class, 'getEmpreendimentoById']);
});
