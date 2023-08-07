<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CareUnitController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/migrate', function () {
    Artisan::call('migrate');
    Artisan::call('db:seed');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/users/{user}/active', [UserController::class, 'active'])->name('users.active');
    Route::post('/users/{user}/inactive', [UserController::class, 'inactive'])->name('users.inactive');
    Route::resource('/users', UserController::class)->only(['index', 'edit', 'update']);

    Route::resource('/articles', ArticleController::class)->except(['show']);
    Route::resource('/shifts', ShiftController::class)->except(['show']);
    Route::resource('/categories', CategoryController::class)->except(['show']);
    Route::resource('/care-units', CareUnitController::class)->except(['show']);
    Route::resource('/contacts', ContactController::class)->only(['index', 'destroy']);
});

require __DIR__.'/auth.php';
