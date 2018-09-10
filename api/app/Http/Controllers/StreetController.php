<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Address;
use App\streets;

class StreetController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(streets $streets){
        $this->streets = $streets;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $validator =  Validator::make($data, [   //Validação de campos

            'nome' => 'required|',
        ]);

        if($validator->fails())
        {
            $result = Response::json([
                'status' =>'false',
                'message' => $validator->errors(),
            ], 422);

        } else{
            $street = $this->streets->store($data);
            if(!($street) OR (sizeof($street) <= 0 )){
                $result = [
                    'status' =>'false',
                    'message' => 'Erro ao Cadastrar Rua',
                    'data' => ''
                ];
            } else{
                $result = [
                    'status' =>'true',
                    'message' => '',
                    'data' => $street,
                ];
            }
        }

        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function list(){
      $Street = $this->streets->list();
      if(!($Street) OR (sizeof($Street) <= 0 )){
          $result = [
              'status' =>'false',
              'message' => 'Nenhum registro encontrado.',
              'data' => ''
          ];
      } else{
          $result = [
              'status' =>'true',
              'message' => 'Nenhum registro encontrado.',
              'data' => $Street,
          ];
      }
      return $result;
    }

}
