<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list($id)
    {
        $Establishments = $this->establishment->listSubCategorie($id);
        if(!($Establishments) OR (sizeof($Establishments) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado',
                'data' => ''
            ];
        } else{
            $now = new Carbon();
            $day = $now->dayOfWeek;
            $now->subHours(3);
            foreach($Establishments as $key=>$value){
                if($day == $value->dia){
                    if($now->toTimeString() >= $value->aberto && $now->toTimeString() <= $value->fechado){
                        $value->status = 'Aberto';
                    }else{
                        $value->status = 'Fechado';
                    }
                }else{
                    $value->status = '-';
                }
            }
            $result = [
                'status' =>'true',
                'message' => '',
                'data' => $Establishments,
            ];
        }
        return $result;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listFavorites($user_id)
    {
        $user_id = 1;
        $Establishments = $this->establishment->listFavorites($user_id);
        if(!($Establishments) OR (sizeof($Establishments) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado',
                'data' => ''
            ];
        } else{
            $now = new Carbon();
            $day = $now->dayOfWeek;
            $now->subHours(3);
            foreach($Establishments as $key=>$value){
                if($day == $value->dia){
                    if($now->toTimeString() >= $value->aberto && $now->toTimeString() <= $value->fechado){
                        $value->status = 'Aberto';
                    }else{
                        $value->status = 'Fechado';
                    }
                }else{
                    $value->status = '-';
                }
            }
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
            'rua' => 'required|',
            'estado' => 'required|',
            'cidade' => 'required|',
            'bairro' => 'required|',
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
                'estado' => $data['estado'],
                'rua' => $data['rua'],
                'cidade' => $data['cidade'],
                'bairro' => $data['bairro'],
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
                    'data' => '',
                ];
            } else{
                $result = [
                    'status' =>'true',
                    'message' => '',
                    'data' => $Establishment,
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
        $Establishments = $this->establishment->find($id);
        if(!($Establishments) OR (sizeof($Establishments) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Nenhum registro encontrado',
                'data' => ''
            ];
        } else{
            $now = new Carbon();
            $day = $now->dayOfWeek;
            $now->subHours(3);
            if($Establishments->dia ){
                if($now->toTimeString() >= $Establishments->aberto && $now->toTimeString() <= $Establishments->fechado){
                    $Establishments->status = 'Aberto';
                }else{
                    $Establishments->status = 'Fechado';
                }
            }else{
                $Establishments->status = '-';
            }
            $result = [
                'status' =>'true',
                'message' => '',
                'data' => $Establishments,
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
        $Establishments = $this->deleteEstablishment->list();
        if(!($Establishments) OR (sizeof($Establishments) <= 0 )){
            $result = [
                'status' =>'false',
                'message' => 'Estabelecimento excluído',
                'data' => ''
            ];
        } else{
            $result = [
                'status' =>'true',
                'message' => 'Erro ao excluir',
                'data' => $Establishments,
            ];
        }
        return $result;
    }
}
