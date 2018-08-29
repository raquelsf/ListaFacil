<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\neighborhoods;

class NeighborhoodController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(neighborhoods $neighborhoods){
        $this->neighborhoods = $neighborhoods;
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
        //
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
      $Neighborhoods = $this->neighborhoods->list();
      if(!($Neighborhoods) OR (sizeof($Neighborhoods) <= 0 )){
          $result = [
              'status' =>'false',
              'message' => 'Nenhum registro encontrado.',
              'data' => ''
          ];
      } else{
          $result = [
              'status' =>'true',
              'message' => 'Nenhum registro encontrado.',
              'data' => $Neighborhoods,
          ];
      }
      return $result;
    }
}
