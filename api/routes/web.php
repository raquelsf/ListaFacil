<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resources([
    'categories' => 'CategoriesController',
    'subcategories' => 'SubcategoriesController',
    'establishments' => 'EstablishmentController',
]);

Route::group(['prefix' => 'subcategories'], function (){
    Route::get('list/{id}', 'SubCategoriesController@list');
});

Route::group(['prefix' => 'establishments'], function (){
    Route::get('list/{id}', 'EstablishmentController@list');
    Route::get('favorites/{id}', 'EstablishmentController@listFavorites');
    
});

Route::group(['prefix' => 'categories'], function (){
    Route::get('list/select', 'CategoriesController@list');
});

Route::group(['prefix' => 'schedules'], function (){
    Route::get('list/select', 'SchedulesController@listEstablishment');
});

Auth::routes(); 