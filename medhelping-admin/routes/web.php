<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Controller as AdminMainController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\ShiftController;

Route::name('admin.')->group(function () {
    Route::get('/', function() { return view('admin.login'); })->name('login');
    Route::post('/authenticate', [AdminMainController::class, 'authenticate'])->name('authenticate');

    Route::get('/api/article/list/{article:type}', [ArticleController::class, 'api_list']);
    Route::get('/api/article/show/{article:id}', [ArticleController::class, 'api_show']);
    Route::post('/api/article/store', [ArticleController::class, 'api_store']);
    Route::post('/api/article/like', [ArticleController::class, 'api_like']);

    Route::get('/api/shift/list', [ShiftController::class, 'api_list']);
    Route::get('/api/shift/show/{shift:id}', [ShiftController::class, 'api_show']);
    Route::post('/api/shift/store', [ShiftController::class, 'api_store']);

    Route::get('/api/comment/list/{article:id}', [CommentController::class, 'api_list']);
    Route::get('/api/comment/destroy/{comment:id}', [CommentController::class, 'api_destroy']);
    Route::post('/api/comment/store', [CommentController::class, 'api_store']);
    Route::post('/api/comment/like', [CommentController::class, 'api_like']);

    Route::get('/api/user/show/{user:email}', [UserController::class, 'api_show']);
    Route::post('/api/user/store', [UserController::class, 'api_store']);

    Route::middleware(['auth:admin'])->group(function () {
        Route::get('/dashboard', [AdminMainController::class, 'dashboard'])->name('dashboard');
        Route::get('/configuracoes', [AdminMainController::class, 'settings'])->name('settings');
        Route::put('/configuracoes/save', [AdminMainController::class, 'settings_save'])->name('settings.save');

        Route::resource('artigos', ArticleController::class)->except(['update'])->scoped(['artigo' => 'id']);
        Route::match(['post', 'put'], '/artigos/{article:id}/update', [ArticleController::class, 'update'])->name('artigos.update');

        Route::resource('usuarios', UserController::class)->scoped(['usuario' => 'id'])
            ->names([
                'index' => 'users.index',
                'create' => 'users.create',
                'store' => 'users.store',
                'show' => 'users.show',
                'edit' => 'users.edit',
                'update' => 'users.update',
                'destroy' => 'users.destroy',
            ]);

        Route::resource('comentarios', CommentController::class)->only(['destroy'])->scoped(['comentario' => 'id'])
            ->names([
                'destroy' => 'comments.destroy',
            ]);

        Route::get('/logout', [AdminMainController::class, 'logout'])->name('logout');
    });
});
