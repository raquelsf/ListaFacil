<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_rua', 'id_cidade', 'id_bairro', 'cep', 'numero', 'complemento'
    ];

    protected $table = 'enderecos';

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
        $Address = Self::get();
        return $Address;
    }
    public function find($id){
        $Address = Self::where('id', $id)->first();
        return $Address;
    }

    public function store($data){
        $Address = Self::Create($data);
        return $Address;    
    }

    public function updateAddress($data, $id){
        $Address = Self::Where('id', $id)->update($data);
        return $Address;
    }
    public function deleteAddress($id){
        $Address = Self::where('id', $id)->delete();
        return $Address;
    }
}
