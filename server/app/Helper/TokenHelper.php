<?php

namespace App\Helper;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenHelper
{
    public function createToken($obj){
        return JWT::encode($obj, 'secret', 'HS256');
    }

    public function validateToken($token){
        return JWT::decode($token, new Key('secret', 'HS256'));
    }
}
