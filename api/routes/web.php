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
    'cities' => 'CitiesController',
    'streets' => 'StreetController',
    'neighborhoods'=> 'NeighborhoodsController',
]);

Route::group(['prefix' => 'subcategories'], function (){
    Route::get('list/{id}', 'SubCategoriesController@list');
});

Route::group(['prefix' => 'cities'], function (){
    Route::get('list/{id}', 'CitiesController@list');
});

Route::group(['prefix' => 'streets'], function (){
    Route::get('list/{id}', 'StreetController@list');
});

Route::group(['prefix' => 'neighborhoods'], function (){
    Route::get('list/{id}', 'NeighborhoodsController@list');
});
