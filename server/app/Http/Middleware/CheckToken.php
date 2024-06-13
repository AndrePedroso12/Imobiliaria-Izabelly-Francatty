<?php

namespace App\Http\Middleware;

use App\Helper\TokenHelper;
use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    private $tokenHelper;

    function __construct()
    {
        $this->tokenHelper = new TokenHelper();
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->bearerToken();
            if (!$token) {
                return response(["error" => "Token Inválido"], 402);
            }

            $decodedToken = $this->tokenHelper->validateToken($token);
            if ($decodedToken) {
                if ($request->ip() == $decodedToken->ip) {
                    $user = User::find($decodedToken->user->id);
                    if (!$user) {
                        return response(["error" => "Token Inválido"], 402);
                    }
                }
            }
            return $next($request);
        } catch (Exception $e) {
            return response(["error" => "Token Inválido"], 402);
        }
    }
}
