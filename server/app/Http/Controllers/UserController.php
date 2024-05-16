<?php

namespace App\Http\Controllers;

use App\Helper\TokenHelper;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
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
            $token = $this->tokenHelper->createToken([
                "user" => $user,
                "ip" => $request->ip()
            ]);
            return response([
                "message" => "Logado com sucesso",
                "token" => "Bearer " . $token,
                "id" => $user->id,
            ], 200);
        }
        return response(["error" => 'Usuário ou senha incorretos'], 400);
    }

    public function createUser(CreateUserRequest $request)
    {
        $users = User::where('email', $request->email)->get();
        if (count($users) > 0) {
            return response(["error" => 'Email já cadastrado'], 400);
        }
        return response(["message" => "Usuário criado com sucesso",], 201);
    }

    public function updateUser(UpdateUserRequest $request, $id)
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

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return response(["message" => "Usuário atualizado com sucesso",], 200);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $token = $request->bearerToken();
        $decodedToken = $this->tokenHelper->validateToken($token);
        $id = $decodedToken->user->id;

        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response(["message" => "Senha incorreta",], 401);
        }
        $user->update([
            'password' => $request->newPassword,
        ]);

        return response(["message" => "Senha alterada com sucesso",], 200);
    }

    public function deleteUser($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        $user->delete();
        return response(["message" => "Usuario deletado com sucesso!"]);
    }


    public function getUser($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $user = User::find($id);
        if (!$user) {
            return response(["error" => 'Usuario não encontrado'], 404);
        }

        return response(new UserResource($user));
    }

    public function getUsers()
    {
        $users = User::all();
        $res = [];

        foreach ($users as $user) {
            $res[] = new UserResource($user);
        }
        return response($res);
    }
}
