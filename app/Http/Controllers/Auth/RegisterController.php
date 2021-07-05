<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends APIController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    public function register(Request $request){
        
        $validator=Validator::make($request->all(),[
            'name'=>'required |string ',
            'email'=>'required |email |max:255 |unique:users',
            'password'=>'required|string|min:3'
        ]);

        if($validator->fails()){
            return $this->responseUnprocessable($validator->errors());
        }

        try{

            $user=$this->create($request->all());
            return $this->responseSuccess('Registration successfully');

        }catch(Exception $e){
            return $this->responseServerError('Registration error');
        }

    }

    protected function create(array $data){
        return User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password'])
        ]);
    }


}
