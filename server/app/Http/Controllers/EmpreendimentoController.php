<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmpreendimentoCreateRequest;
use App\Http\Requests\EmpreendimentoUpdateRequest;
use App\Http\Resources\EmpreendimentoResource;
use App\Models\Empreendimentos;
use Illuminate\Support\Facades\Storage;

class EmpreendimentoController extends Controller
{
    public function getAllEmpreendimentos()
    {
        return response(EmpreendimentoResource::collection(Empreendimentos::all()), 200);
    }

    public function getEmpreendimentoById($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $empreendimento = Empreendimentos::find($id);
        if (!$empreendimento) {
            return response(["error" => 'Empreendimento não encontrado'], 404);
        }
        return response(new EmpreendimentoResource($empreendimento), 200);
    }

    public function deleteEmpreendimentoById($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $empreendimento = Empreendimentos::find($id);
        if (!$empreendimento) {
            return response(["error" => 'Empreendimento não encontrado'], 404);
        }

        if (Storage::exists('public/' . $empreendimento->logo)) {
            Storage::delete('public/' . $empreendimento->logo);
        }
        if (Storage::exists('public/' . $empreendimento->mainImage)) {
            Storage::delete('public/' . $empreendimento->mainImage);
        }

        $empreendimento->delete();
        return response(["message" => "Empreendimento deletado com sucesso!"]);
    }

    public function createEmpreendimentoById(EmpreendimentoCreateRequest $request)
    {
        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            $logo = $request->file('logo');
            $logo_path = $logo->store('public');
            $logo_path = str_replace('public/', '', $logo_path);
        }

        if ($request->hasFile('mainImage') && $request->file('mainImage')->isValid()) {
            $mainImage = $request->file('mainImage');
            $mainImage_path = $mainImage->store('public');
            $mainImage_path = str_replace('public/', '', $mainImage_path);
        }

        $empreendimento = Empreendimentos::create([
            'name' => $request->name,
            'logo' => $logo_path,
            'mainImage' => $mainImage_path,
        ]);
        return response(new EmpreendimentoResource($empreendimento), 201);
    }

    public function updateEmpreendimentoById(EmpreendimentoUpdateRequest $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $empreendimento = Empreendimentos::find($id);
        if (!$empreendimento) {
            return response(["error" => 'Empreendimento não encontrado'], 404);
        }

        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            if (Storage::exists('public/' . $empreendimento->logo)) {
                Storage::delete('public/' . $empreendimento->logo);
            }
            $logo = $request->file('logo');
            $logo_path = $logo->store('public');
        } else {
            $logo_path = $empreendimento->logo;
        }
        $logo_path = str_replace('public/', '', $logo_path);

        if ($request->hasFile('mainImage') && $request->file('mainImage')->isValid()) {
            if (Storage::exists('public/' . $empreendimento->mainImage)) {
                Storage::delete('public/' . $empreendimento->mainImage);
            }
            $mainImage = $request->file('mainImage');
            $mainImage_path = $mainImage->store('public');
        } else {
            $mainImage_path = $empreendimento->mainImage;
        }
        $mainImage_path = str_replace('public/', '', $mainImage_path);

        $empreendimento->update([
            "name" => $request->name,
            "logo" => $logo_path,
            "mainImage" => $mainImage_path,
        ]);
        $empreendimento = Empreendimentos::find($id);
        return response(new EmpreendimentoResource($empreendimento), 200);
    }
}
