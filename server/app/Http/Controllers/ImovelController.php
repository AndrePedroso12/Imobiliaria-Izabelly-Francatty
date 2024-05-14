<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImovelRequest;
use App\Http\Resources\ImoveisAdminResource;
use App\Models\Imovel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImovelController extends Controller
{
    public function getImoveis()
    {
        $imoveis = Imovel::all();
        $res = [];
        foreach ($imoveis as $imovel) {
            $res[] = new ImoveisAdminResource($imovel);
        }
        return response($res);
    }
    public function getImovel($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }
        return response(new ImoveisAdminResource($imovel));
    }

    public function addVideo(Request $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }
        if ($imovel->video) {

            if (Storage::exists('public/' . $imovel->video)) {
                // Se o arquivo existe, exclua-o
                Storage::delete('public/' . $imovel->video);
            }
        }

        if ($request->hasFile('video') && $request->file('video')->isValid()) {
            $video = $request->file('video');

            $path = $video->store('public');
            $path = str_replace('public/', '', $path);
            $imovel->update(['video' => $path]);
            $imovel = Imovel::find($id);

            return response(new ImoveisAdminResource($imovel));
        }
    }

    public function getVideo($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }
        return Storage::download('public/' . $imovel->video);
    }


    public function createImovel(ImovelRequest $request)
    {
        $dados = $request->all();
        $dados['caracteristics'] = implode("|", $dados['caracteristics']);
        $dados['tags'] = implode("|", $dados['tags']);
        $imovel = Imovel::create($dados);
        return response(new ImoveisAdminResource($imovel), 201);
    }

    public function updateImovel(ImovelRequest $request, $id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }

        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }

        $dados = $request->all();
        $dados['caracteristics'] = implode("|", $dados['caracteristics']);
        $dados['tags'] = implode("|", $dados['tags']);

        $imovel->update($dados);
        return response(new ImoveisAdminResource(Imovel::find($id)));
    }

    public function deleteImovel($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }

        $imovel->delete();
        return response(["message" => "Imóvel deletado com sucesso!"]);
    }
}
