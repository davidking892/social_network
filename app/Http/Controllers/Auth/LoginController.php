<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Auth;

class LoginController extends APIController
{
     
      public function login(){
        
        $credentials=request(['email','password']);

        if( ! $token=auth()->attempt($credentials)){
            return $this->responseUnauthorized();
        }

        $user=auth()->user();

        return response()->json([
            'status'=>200,
            'message'=>'Authorized.',
            'access_token'=>$token,
             'token_type'=>'bearer',
             'user'=>array(
                 'id'=>$user->id,
                 'name'=>$user->name,
                 'email'=>$user->email,
                 'created_at'=>$user->created_at
             )
             ],200);

      }

}
