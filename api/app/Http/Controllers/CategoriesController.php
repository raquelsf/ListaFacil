<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;

use App\categories;

class CategoriesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(categories $categories){
        $this->categories = $categories;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Categories = $this->categories->list();
        if(!($Categories) OR (sizeof($Categories) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado.',
                'data' => ''
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => 'Nenhum registro encontrado.',
                'data' => $Categories,
            ];
        }
        return $result;
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
            'imagem' => 'required|',
        ]);

        if($validator->fails())
        {
            $result = Response::json([
                'status' =>'false',
                'message' => $validator->errors(),
            ], 422);

        } else{
          $file = $request->file('imagem');
          $destinationPath = 'images/categorias';
          $extension = $file->getClientOriginalExtension();
          $Name = rand(11111,99999);
          $fileName = $Name.'.'.$extension;
          $img = Image::make($file);
          $width = $img->width();
          $height = $img->height();
          if($width > $height){
              $img->resize(300, null, function ($constraint) {
                  $constraint->aspectRatio();
                  $constraint->upsize();
              });
              $img->resizeCanvas(300, 300, 'center', false, 'ffffff');
              $img->save($destinationPath.$fileName);
          } else{
              $img->resize(null, 300, function ($constraint) {
                  $constraint->aspectRatio();
                  $constraint->upsize();
              });
              $img->resizeCanvas(300, 300, 'center', false, 'ffffff');
              $img->save($destinationPath.$fileName);
          }

          $data_categorie = [
              'nome' => $data['nome'],
              'imagem' => $fileName,
          ];
            $Categorie = $this->categories->store($data_categorie);
            if(!($Categorie) OR (sizeof($Categorie) <= 0 )){
                $result = [
                    'status' =>'false',
                    'message' => 'Registro encontrado',
                    'data' => '',
                ];
            } else{
                $result = [
                    'status' =>'true',
                    'message' => '',
                    'data' => $Categorie,
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
        $Categorie = $this->categories->find($id);
        if(!($Categorie) OR (sizeof($Categorie) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Registro encontrado',
                'data' => ''
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => '',
                'data' => $Categorie,
            ];
        }
        return $result;
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
}
