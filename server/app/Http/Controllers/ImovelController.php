<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImovelRequest;
use App\Http\Resources\ImoveisAdminResource;
use App\Http\Resources\ImoveisHomeResource;
use App\Http\Resources\ImovelResource;
use App\Models\Imovel;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImovelController extends Controller
{
    public function getImoveisAdmin()
    {
        $imoveis = Imovel::all();
        $res = [];
        foreach ($imoveis as $imovel) {
            $res[] = new ImoveisAdminResource($imovel);
        }
        return response($res);
    }
    public function getImoveisHome()
    {
        $imoveis = Imovel::all();
        $res = [];
        foreach ($imoveis as $imovel) {
            $res[] = new ImoveisHomeResource($imovel);
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
        return response(new ImovelResource($imovel));
    }

    public function getImovelAdminById($id)
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
        throw new HttpResponseException(response()->json([
            'errors' => ['video' => "Nenhum vídeo enviado"],
        ], 422));
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
        try {

            DB::beginTransaction();
            foreach ($imovel->images as $img) {

                if (Storage::exists('public/' . $img->img)) {
                    Storage::delete('public/' . $img->imagem);
                }
                $img->delete();
            }

            $imovel->delete();
            DB::commit();
            return response(["message" => "Imóvel deletado com sucesso!"]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response(["message" => "Falha ao Deletar imovel"], 500);
        }
    }

    public function deleteVideo($id)
    {
        if (!is_numeric($id)) {
            return response(["errors" => "Id Invalido"], 400);
        }
        $imovel = Imovel::find($id);
        if (!$imovel) {
            return response(["error" => 'Imóvel não encontrado'], 404);
        }

        try {
            if (Storage::exists('public/' . $imovel->video)) {
                $tmp = Storage::delete('public/' . $imovel->video);
            }

            $imovel->update(['video' => null]);
            return response(["message" => "Vídeo deletado com sucesso!"]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response(["message" => "Falha ao Deletar vídeo"], 500);
        }
    }
}
