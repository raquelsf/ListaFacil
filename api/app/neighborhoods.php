<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class neighborhoods extends Model
{
  use SoftDeletes;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */

  protected $table = 'bairros';

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

      $Neighborhoods =Self::select(
                        'nome as text',
                        'id'
                    )
                    ->get();
      return $Neighborhoods;
  }
  public function find($id){
      $Neighborhoods = Self::where('id', $id)->first();
      return $Neighborhoods;
  }

  public function store($data){
      $Neighborhoods = Self::Create($data);
      return $Neighborhoods;
  }

  public function updateNeighborhood($data, $id){
      $Neighborhoods = Self::Where('id', $id)->update($data);
      return $Neighborhoods;
  }
  public function deleteNeighborhood($id){
      $Neighborhoods = Self::where('id', $id)->delete();
      return $Neighborhoods;
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
            $data_neighborhood['nome'] = $data;
            $neighborhood = Self::create($data_neighborhood);
            return $neighborhood->id;
        }
    }
}
}
