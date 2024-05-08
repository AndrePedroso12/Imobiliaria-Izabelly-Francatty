<?php

namespace App\Http\Controllers;

use App\Helper\TokenHelper;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private $tokenHelper;

    function __construct()
    {
        $this->tokenHelper = new TokenHelper();
    }
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->login)->first();
        if (!$user) {
            return response(["error" => 'Usuário ou senha incorretos'], 400);
        }

        if (Hash::check($request->password, $user->password)) {
            $user = [
                "user" => $user,
                "ip" => $request->ip()
            ];
            $token = $this->tokenHelper->createToken($user);
            return response([
                "message" => "Logado com sucesso",
                "token" => "Bearer " . $token
            ], 200);
        }
        return response(["error" => 'Usuário ou senha incorretos'], 400);
    }
    public function createUser(UserRequest $request)
    {
        $users = User::where('email', $request->email)->get();
        if (count($users) > 0) {
            return response(["error" => 'Email já cadastrado'], 400);
        }
        return response(User::create($request->all()), 201);
    }

    public function updateUser(UserRequest $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $users = User::where('email', $request->email)->where("id", "!=", $id)->get();
        if (count($users) > 0) {
            return response(["error" => 'Email já cadastrado'], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        $user->update($request->all());
        return response(User::find($id));
    }

    public function deleteUser(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        $user->delete();
        return response(["message" => "usuario deletado com sucesso!"]);
    }


    public function getUser(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        return response($user);
    }

    public function getUsers(Request $request)
    {
        $users = User::all();
        return response($users);
    }
}
