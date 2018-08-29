<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedules extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $fillable = [
        'id_estabelecimento', 'dia', 'aberto', 'fechado'
    ];
  
    protected $table = 'horarios';
  
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
        $Schedules = Self::get();
        return $Schedules;
    }
    public function find($id){
        $Schedules = Self::where('id', $id)->first();
        return $Schedules;
    }
  
    public function store($data){
        $Schedules = Self::Create($data);
        return $Schedules;
    }
  
    public function updateSchedules($data, $id){
        $Schedules = Self::Where('id', $id)->update($data);
        return $Schedules;
    }
    public function deleteState($id){
        $Schedules = Self::where('id', $id)->delete();
        return $Schedules;
    }

    public function listEstablishment($id_establishment){
        $Schedules = Self::where('id_estabelecimento', $id_establishment)->get();
        return $Schedules;
    }
}
