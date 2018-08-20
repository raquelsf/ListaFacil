<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class states extends Model
{
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'nome', 'sigla'
  ];

  protected $table = 'estados';

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
      $State = Self::get();
      return $State;
  }
  public function find($id){
      $State = Self::where('id', $id)->first();
      return $State;
  }

  public function store($data){
      $State = Self::Create($data);
      return $State;
  }

  public function updateState($data, $id){
      $State = Self::Where('id', $id)->update($data);
      return $State;
  }
  public function deleteState($id){
      $State = Self::where('id', $id)->delete();
      return $State;
  }
}
