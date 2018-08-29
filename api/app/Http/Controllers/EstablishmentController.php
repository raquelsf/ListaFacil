<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Image;

use App\establishment;
use App\Address;

class EstablishmentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(establishment $establishment, Address $Address){
        $this->establishment = $establishment;
        $this->address = $Address;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Establishments = $this->establishment->list();
        if(!($Establishments) OR (sizeof($Establishments) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado',
                'data' => ''
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => '',
                'data' => $Establishments,
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
            'id_subcategoria' => 'required|',
            'nome' => 'required|',
            'desc' => 'required|',
            'facebook' => 'required|',
            'instagram' => 'required|',
            'email' => 'required|',
            'imagem' => 'required|',
            'id_rua' => 'required|',
            'id_cidade' => 'required|',
            'id_bairro' => 'required|',
            'cep' => 'required|',
            'numero'=> 'required|',
            'complemento' => 'required|',
        ]);

        if($validator->fails())
        {
            $result = Response::json([
                'status' =>'false',
                'message' => $validator->errors(),
            ], 422);

        } else{
            
            $data_address = [
                'id_rua' => $data['id_rua'],
                'id_cidade' => $data['id_cidade'],
                'id_bairro' => $data['id_bairro'],
                'cep' => $data['cep'],
                'numero' => $data['numero'],
                'complemento' => $data['complemento'],
            ];

            $Address = $this->address->store($data_address);

            $file = $request->file('imagem');
            $destinationPath = 'images/';
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


            $data_establishment = [
                'id_subcategoria' => $data['id_subcategoria'],
                'id_endereco' => $Address->id,
                'nome' => $data['nome'],
                'desc' => $data['desc'],
                'facebook' => $data['facebook'],
                'instagram' => $data['instagram'],
                'email' => $data['email'],
                'imagem' => $fileName,
            ];

            $Establishment = $this->establishment->store($data_establishment);
            if(!($Establishment) OR (sizeof($Establishment) <= 0 )){
                $result = [
                    'status' =>'false',
                    'message' => 'Registro encontrado',
                ];
            } else{
                $result = [
                    'status' =>'true',
                    'dados' => $Establishment,
                ];
            }
        }

        return response()->json($result);
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
}
