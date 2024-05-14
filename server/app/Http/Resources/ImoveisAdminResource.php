<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImoveisAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $request->id,
            'banner' => '',
            'isfavourite' => 'Implementar',
            'isTop' => 'Implementar',
            'category' => $request->tipo,
            'model' => $request->pretensao,
            'mainImage' => 'Implementar',
            'images' => 'Implementar',
            'video' => 'Implementar',
            'location' => 'Implementar',
            'price' => $request->preco,
            'monthly' => 'Implementar',
            'details' => [
                'rooms' => $request->qtd_quartos,
                'bathrooms' => $request->qtd_banheiros,
                'garage' => $request->qtd_vagas_garagem,
                'suites' => $request->qtd_Suites,
                'area' => $request->area_construida ?? $request->area_terreno,
                'tags' => $request->tags,
            ],
            'description' => $request->descricao,
            'tags' => $request->tags,
            'sellerName' => $request->vendedor,
        ];



        return $data;
    }
}
