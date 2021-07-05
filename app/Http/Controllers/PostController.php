<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Post;
use App\User;
use App\Like;
use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Validator;

class PostController extends APIController
{

    public function __construct() {
        if(! $user=auth()->user()){
            return $this->responseUnauthorized();
        }
    
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(! $user=auth()->user()){
            return $this->responseUnauthorized();
        }
    
         $users=User::latest()->paginate(5);
         $posts=Post::latest()->paginate(5);
         $likes=auth()->user()->likes;


         return response()->json([
             'posts'=>$posts,
             'users'=>$users,
             'likes'=>$likes
         ]);
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

         $validator=Validator::make($request->all(),[
             'message'=>'required'
         ]);

         if($validator->fails()){
             return $this->responseUnprocessable($validator->errors());
         }

         try{
             $post=Post::create([
                 'user_id'=>auth()->user()->id,
                 'message'=>request('message'),
             ]);

             return response()->json([
                 'status'=>201,
                 'message'=>'Resouce created.',
                 
             ],201);

         }catch(Exception $e){
             return $this->responseServerError('Error creating resource.');
         }

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
    public function destroy()
    {
        $id=request('id');
        $post=Post::where('id',$id)->first();
        if(auth()->user() != $post->user ){
            return $this->responseUnauthorized();
        }
         $post->delete();
         return response()->json([
             'status'=>200,
             'message'=>'Successfully'
         ]);
    }
}
