<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class subcategories extends Model
{
    use SoftDeletes;

    protected $table = 'subcategorias';

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_categoria', 'nome'
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
        $Subcategories = Self::Join('categorias', 'subcategorias.id_categoria', 'categorias.id')
                                ->select(
                                        'subcategorias.id', 
                                        'subcategorias.nome',
                                        'categorias.nome as categoria'
                                        )
                                ->get();
        return $Subcategories;
    }
    public function find($id){
        $Subcategories = Self::where('id', $id)->first();
        return $Subcategories;
    }

    public function store($data){
        $Subcategories = Self::Create($data);
        return $Subcategories;
    }

    public function updateStreet($data, $id){
        $Subcategories = Self::Where('id', $id)->update($data);
        return $Subcategories;
    }
    public function deleteStreet($id){
        $Subcategories = Self::where('id', $id)->delete();
        return $Subcategories;
    }
}
