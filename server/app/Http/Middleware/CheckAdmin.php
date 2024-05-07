<?php

namespace App\Http\Middleware;

use App\Helper\TokenHelper;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
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
                return response(["error" => "Invalid Token"], 402);
            }

            $decodedToken = $this->tokenHelper->validateToken($token);
            if ($decodedToken) {
                if (!$decodedToken->user->admin) {
                    dd($decodedToken);
                    return response(["error" => "Usuario sem acesso"], 402);
                }
            }
            return $next($request);
        } catch (Exception $e) {
            return response(["error" => "Invalid Token"], 402);
        }
    }
}
