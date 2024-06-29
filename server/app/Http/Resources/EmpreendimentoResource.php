<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpreendimentoResource extends JsonResource
{
    protected $emp;

    public function __construct($emp)
    {
        // Store the model instance
        $this->emp = $emp;
    }

    public function toArray(Request $request): array
    {
        $data = [
            "id" => $this->emp->id,
            "name" => $this->emp->name,
            "city" => $this->emp->city,
            "logo" => '/api/imagem/filename/' . $this->emp->logo,
            "mainImage" => '/api/imagem/filename/' . $this->emp->mainImage,
        ];

        return $data;
    }
}
