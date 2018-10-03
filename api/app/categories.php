<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class categories extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'imagem'
    ];

    protected $table = "categorias";
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
        $Categories = Self::select(
                        'categorias.nome as text',
                        'categorias.nome as nome',
                        'categorias.id',
                        'categorias.imagem'
                      )
                    ->get();
        return $Categories;
    }


    public function find($id){
        $Categorie = Self::where('id', $id)->first();
        return $Categorie;
    }

    public function store($data){
        $Categorie = Self::Create($data);
        return $Categorie;
    }

    public function updateCategorie($data, $id){
        $Categorie = Self::Where('id', $id)->update($data);
        return $Categorie;
    }
    public function deleteCategorie($id){
        $Categorie = Self::where('id', $id)->delete();
        return $Categorie;
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
                $data_categorie['nome'] = $data;
                $categorie = Self::create($data_categorie);
                return $categorie->id;
            }
        }
    }
}
