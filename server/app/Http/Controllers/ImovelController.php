<?php

namespace App\Http\Controllers;

use App\Models\Imovel;
use Illuminate\Http\Request;

class ImovelController extends Controller
{
    public function getImoveis()
    {
        $imoveis = Imovel::all()->toArray();
        $res = [];
        foreach ($imoveis as $imovel) {
            $tmp = $imovel;
            $tmp['caracteristics'] = explode("|", $tmp['caracteristics']);
            $res[] = $tmp;
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
        $imovel->caracteristics = explode("|", $imovel->caracteristics);
        return response($imovel);
    }
    public function createImovel(Request $request)
    {
        $dados = $request->all();
        $dados['caracteristics'] = implode("|", $dados['caracteristics']);
        $imovel = Imovel::create($dados);
        $imovel->caracteristics = explode("|", $imovel->caracteristics);
        return response($imovel, 201);
    }
    public function updateImovel(Request $request, $id)
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

        $imovel->update($dados);
        return response(Imovel::find($id));
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
