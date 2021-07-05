<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
  'middleware'=>'cors',
  'prefix'=>'auth'
],function($router){
    Route::post('register','Auth\RegisterController@register');
    Route::post('login','Auth\LoginController@login');
    Route::post('forgot-password','Auth\ForgotPasswordController@email');
    Route::post('password-reset','Auth\ResetPasswordController@reset');
});

Route::group([
  'middleware'=>'cors',
],function($router){
   Route::post('createPost','PostController@store');
   Route::post('fetchPost','PostController@index');
  Route::post('like','LikeController@likePost');
  Route::post('posts/delete','PostController@destroy');
  Route::post('post/edit','PostController@edit');
});
