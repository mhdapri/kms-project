<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\AdminContentController;
use App\Http\Controllers\Api\Public\PublicAppController;
use App\Http\Controllers\Api\Public\PublicContentController;
use App\Http\Controllers\Api\Super\SuperAppController;
use Illuminate\Support\Facades\Route;

// ============ PUBLIC ============
Route::get('/apps', [PublicAppController::class, 'index']);
Route::get('/contents', [PublicContentController::class, 'index']);
Route::post('/public/contents', [PublicContentController::class, 'store']);

// ============ AUTH ============
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ============ ADMIN & SUPER ADMIN ============
    Route::middleware('role:admin,super_admin')->prefix('admin')->group(function () {
        Route::get('/contents', [AdminContentController::class, 'index']);
        Route::patch('/contents/{id}/approve', [AdminContentController::class, 'approve']);
        Route::patch('/contents/{id}/reject', [AdminContentController::class, 'reject']);
    });

    // ============ SUPER ADMIN ONLY ============
    Route::middleware('role:super_admin')->prefix('super')->group(function () {
        Route::get('/apps', [SuperAppController::class, 'index']);
        Route::post('/apps', [SuperAppController::class, 'store']);
        Route::put('/apps/{id}', [SuperAppController::class, 'update']);
        Route::delete('/apps/{id}', [SuperAppController::class, 'destroy']);
    });
});
