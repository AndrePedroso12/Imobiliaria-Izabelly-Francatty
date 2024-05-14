<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImoveisHomeResource extends JsonResource
{
    protected $imovel;

    public function __construct($imovel)
    {
        // Store the model instance
        $this->imovel = $imovel;
    }

    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->imovel->id,
            'banner' => isset($this->imovel->isBanner) && $this->imovel->isBanner > 0 ? true : false,
            'isfavourite' => isset($this->imovel->isfavourite) && $this->imovel->isfavourite > 0 ? true : false,
            'isTop' => isset($this->imovel->isTop) && $this->imovel->isTop > 0 ? true : false,
            'category' => $this->imovel->tipo,
            'model' => $this->imovel->pretensao,
            'mainImage' => $this->imovel->mainImage,
            'location' => [
                'city' => $this->imovel->cidade,
                'neighborhood' => $this->imovel->bairro,
            ],
            'price' => $this->imovel->preco,
            'monthly' => $this->imovel->monthly,
            'details' => [
                'rooms' => $this->imovel->qtd_quartos,
                'bathrooms' => $this->imovel->qtd_banheiros,
                'garage' => $this->imovel->qtd_vagas_garagem,
                'suites' => $this->imovel->qtd_Suites,
                'area' => $this->imovel->area_construida ?? $this->imovel->area_terreno,
            ],
            'description' => $this->imovel->descricao,
            'tags' =>  explode("|", $this->imovel->tags),
        ];

        return $data;
    }
}