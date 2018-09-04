<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class streets extends Model
{
  use SoftDeletes;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */

  protected $table = 'ruas';

  protected $fillable = [
      'nome',
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
      $Streets = Self::select(
                        'nome as text',
                        'id'
                    )
                    ->get();
      return $Streets;
  }
  public function find($id){
      $Streets = Self::where('id', $id)->first();
      return $Streets;
  }

  public function store($data){
      $Streets = Self::Create($data);
      return $Streets;
  }

  public function updateStreet($data, $id){
      $Streets = Self::Where('id', $id)->update($data);
      return $Streets;
  }
  public function deleteStreet($id){
      $Streets = Self::where('id', $id)->delete();
      return $Streets;
  }
  
  public function check($data){
    if(isset($data['id'])){
      $find = Self::where('id', $data['id'])->first();
      if((isset($find)) && (sizeof($find) > 0)){
        return $data['id'];
      }
    } else{
        $find = Self::where('nome', $data)->first();
        if((isset($find)) && (sizeof($find) > 0)){
           return $find ->id;
        } else{
            $data_street['nome'] = $data;
            $street = Self::create($data_street);
            return $street->id;  
        }
    }
}
}
