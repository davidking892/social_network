<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function email(Request $request){
        
        $validator=Validator::make([
            $request->only('email'),
            ['email' => 'required|string|email|max:255|exists:users,email'],
            ['exists' => "We couldn't find an account with that email."]

        ]);

        if($validator->fails()){
            return 'validator fails';
        }

        $response=$this->sendResetLinkEmail($request);

        if($response){
            return 'Email reset link sent';
        }else{
            return 'server error';
        }

    }

}
