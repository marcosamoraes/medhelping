<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CareUnitController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\UserController;

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

Route::get('/', function () {
    return response()->json(['message' => 'MedHelping API', 'status' => 'Connected']);;
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('forgot-password', [PasswordController::class, 'forgot']);

Route::get('categories', [CategoryController::class, 'index']);
Route::get('care-units', [CareUnitController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('me', [AuthController::class, 'me']);

    Route::post('articles/{article}/like', [ArticleController::class, 'like']);
    Route::post('articles/{article}/comment', [ArticleController::class, 'comment']);
    Route::post('articles/{article}/share', [ArticleController::class, 'share']);
    Route::apiResource('articles', ArticleController::class);

    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    Route::post('comments/{comment}/like', [CommentController::class, 'like']);

    Route::apiResource('shifts', ShiftController::class);

    Route::put('users/{user}/password', [UserController::class, 'updatePassword']);
    Route::put('users/{user}/profile', [UserController::class, 'updateProfile']);
    Route::put('users/{user}/avatar', [UserController::class, 'updateAvatar']);
    Route::put('users/{user}/address', [UserController::class, 'updateAddress']);
    Route::apiResource('users', UserController::class)->only(['show', 'update']);
});
