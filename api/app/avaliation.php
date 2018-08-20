<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class avaliation extends Model
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

   protected $table = "avaliacoes";
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
       $Categories = Self::get();
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
}
