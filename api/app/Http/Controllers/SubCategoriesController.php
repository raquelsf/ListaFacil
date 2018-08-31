<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;

use App\subcategories;
use App\categories;

class SubCategoriesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(subcategories $subcategories, categories $categories){
        $this->subcategories = $subcategories;
        $this->categories = $categories;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $SubCategories = $this->subcategories->list();
      if(!($SubCategories) OR (sizeof($SubCategories) <= 0 )){
          $result = [
              'status' =>'false',
              'message' => 'Nenhum registro encontrado.',
              'data' => ''
          ];
      } else{
          $result = [
              'status' =>'true',
              'message' => 'Nenhum registro encontrado.',
              'data' => $SubCategories,
          ];
      }
      return $result;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list($id)
    {
        $SubCategories = subcategories::where('categorie_id', $id)->get();
        if(!($SubCategories) OR (sizeof($SubCategories) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado',
                'data' => '',
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => '',
                'data' => $SubCategories,
            ];
        }
        return response()->json($result);
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
          'id_categoria' => 'required|',
          'nome' => 'required|',
      ]);

      if($validator->fails())
      {
          $result = Response::json([
              'status' =>'false',
              'message' => $validator->errors(),
          ], 422);

      } else{
          $categorie = $this->categories->check($data['categorie']);
          $data['id_categoria'] = $categorie;
          $Subcategorie = $this->subcategories->store($data);
          if(!($Subcategorie) OR (sizeof($Subcategorie) <= 0 )){
              $result = [
                  'status' =>'false',
                  'message' => 'Erro ao Cadastrar Subcategoria',
                  'data' => '',
              ];
          } else{
              $result = [
                  'status' =>'true',
                  'message' => '',
                  'data' => $Subcategorie,
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
        $Subcategorie = $this->deleteSubcategorie->list();
        if(!($Subcategorie) OR (sizeof($Subcategorie) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Sub Categoria excluída',
                'data' => ''
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => 'Erro ao excluir',
                'data' => $Subcategorie,
            ];
        }
        return $result;
    }
}
