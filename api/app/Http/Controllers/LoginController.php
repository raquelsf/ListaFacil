<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request){
        $data = $request->all();
        $rules = array(
            'username'    => 'required', 
            'password' => 'required|alphaNum|min:3' 
        );
        
        $validator = Validator::make($data, $rules);
        
        if ($validator->fails()) {
            $result = [
                'status' => 'false',
                'message' => $validator,
            ];
        } else {
            $userdata =[
                'email'     => $data['email'],
                'password'  => $data['password'],
            ];
            if (Auth::attempt($userdata)) {
                $result = [
                    'status' => 'true',
                    'message' => "Logado",
                ];
            } else {        
                $result = [
                    'status' => 'false',
                    'message' => "Usuário ou senha incorretos",
                ];
            }
        }
        return $result;
    }
}
