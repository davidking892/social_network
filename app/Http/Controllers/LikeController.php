<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Like;

class LikeController extends Controller
{
    public function likePost(){
        
        $post_id=request('id');
        $status=request('status');
        $post=Post::find($post_id);
        $update=false;

        if(! $post){
            return null;
        }

        $user=auth()->user();
        $like=$user->likes()->where('post_id',$post_id)->first();
        if($like){
           $update=true;
           $already_like=$like->like;
           if($already_like==$status){
               $like->delete();
               $likes=auth()->user()->likes;
               return response()->json([
                'status'=>200,
                'message'=>'Successfylly',
                'likes'=>$likes
           ]);
              
           }
        }else{
            $like=new Like();
        }

        $like->like=$status;
        $like->user_id=$user->id;
        $like->post_id=$post->id;
        if($update){
            $like->update();
        }else{
            $like->save();
        }

        $likes=auth()->user()->likes;
        
        return response()->json([
             'status'=>200,
             'message'=>'Successfylly',
             'likes'=>$likes
        ]);
    }
}
