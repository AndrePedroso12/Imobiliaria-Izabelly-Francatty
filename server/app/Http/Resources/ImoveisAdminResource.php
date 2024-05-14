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
            'banner' => $this->imovel->isBanner,
            'isfavourite' => $this->imovel->isFavorite,
            'isTop' => $this->imovel->isTop,
            'category' => $this->imovel->tipo,
            'model' => $this->imovel->pretensao,
            'mainImage' => $this->imovel->mainImage,
            'images' => 'Implementar',
            'video' => '/api/imovel/getVideo/' . $this->imovel->id,
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
                'tags' => explode("|", $this->imovel->caracteristics),
            ],
            'description' => $this->imovel->descricao,
            'tags' =>  explode("|", $this->imovel->tags),
            'sellerName' => $this->imovel->vendedor,
        ];



        return $data;
    }
}
