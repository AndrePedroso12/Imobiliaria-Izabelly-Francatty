<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImagesResource;
use App\Http\Resources\ImoveisAdminResource;
use App\Models\Images;
use App\Models\Imovel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    public function getImage($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imagem = Images::find($id);
        if (!$imagem) {
            return response(["error" => 'Imagem não encontrado'], 404);
        }
        return Storage::download('public/' . $imagem->imagem);
    }

    public function deleteImagem($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imagem = Images::find($id);
        if (!$imagem) {
            return response(["error" => 'Imagem não encontrado'], 404);
        }

        $imagem->delete();
        // Verifique se o arquivo existe
        if (Storage::exists('public/' . $imagem->imagem)) {
            // Se o arquivo existe, exclua-o
            Storage::delete('public/' . $imagem->imagem);
            return response(["message" => "Imagem deletado com sucesso!"]);
        } else {
            // Se o arquivo não existe, retorne uma resposta 404
            return response(["error" => 'Imagem não encontrado'], 404);
        }
        return response(["message" => "Imagem deletado com sucesso!"]);
    }

    public function addImagem(Request $request, $id_imovel)
    {
        if (!is_numeric($id_imovel)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id_imovel);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }
        if ($request->hasFile('imagem') && $request->file('imagem')->isValid()) {
            $imagem = $request->file('imagem');

            $path = $imagem->store('public');
            $path = str_replace('public/', '', $path);
            $isMain = strtoupper($request->isMain) == "TRUE" ? true : false;


            if ($isMain) {
                $main = Images::where("imovel_id", $id_imovel)->get();
                foreach ($main as $i) {
                    $i->update(["isMain" => false]);
                }
            }

            Images::create([
                'imagem' => $path,
                'imovel_id' => $id_imovel,
                "isMain" => $isMain
            ]);
            $imovel = Imovel::find($id_imovel);
            return response(new ImoveisAdminResource($imovel));
        }
    }

    public function getAllImages()
    {
        $images = Images::all();

        $res = [];
        foreach ($images as $image) {
            $res[] = new ImagesResource($image);
        }
        return response($res);
    }

    public function changeMainImage($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }

        $newMain = Images::find($id);
        if (!$newMain) {
            return response(["error" => 'Imagem não encontrado'], 404);
        }
        $main = Images::where("imovel_id", $newMain->imovel_id)->get();
        foreach ($main as $i) {
            $i->update(["isMain" => false]);
        }

        $newMain->update([["isMain" => false]]);

        $imovel = Imovel::find($newMain->imovel_id);
        return response(new ImoveisAdminResource($imovel));
    }
}
