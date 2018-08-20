<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class cities extends Model
{
  use SoftDeletes;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */

  protected $table = 'Cidades';

  protected $fillable = [
      'id_estado', 'nome',
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = ['created_at', 'updated_at', 'deleted_at'];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'deleted_at',
  ];
  public function list(){
      $Cities = Self::get();
      return $Cities;
  }
  public function find($id){
      $Cities = Self::where('id', $id)->first();
      return $Cities;
  }

  public function store($data){
      $Cities = Self::Create($data);
      return $Cities;
  }

  public function updateCities($data, $id){
      $Cities = Self::Where('id', $id)->update($data);
      return $Cities;
  }
  public function deleteCities($id){
      $Cities = Self::where('id', $id)->delete();
      return $Cities;
  }
}
