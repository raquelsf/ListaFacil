<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class establishment extends Model
{
    use SoftDeletes;
    
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     * 
     */

    protected $fillable = [
        'id_subcategoria', 'id_endereco', 'nome', 'desc', 'facebook', 'instagram', 'email', 'imagem'
    ];

    protected $table = 'estabelecimentos';

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
        $Establishments = Self::get();
        return $Establishments;
    }
    public function find($id){
        $Establishment = Self::where('id', $id)->first();
        return $Establishment;
    }

    public function store($data){
        $Establishment = Self::Create($data);
        return $Establishment;    
    }

    public function updateEstablishment($data, $id){
        $Establishment = Self::Where('id', $id)->update($data);
        return $Establishment;
    }
    public function deleteEstablishment($id){
        $Establishment = Self::where('id', $id)->delete();
        return $Establishment;
    }
}
