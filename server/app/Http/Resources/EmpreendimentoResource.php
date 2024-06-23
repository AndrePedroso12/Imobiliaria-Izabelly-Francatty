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
            "name" => $this->emp->name,
            "logo" => '/api/imagem/filename/' . $this->emp->logo,
            "mainImage" => '/api/imagem/filename/' . $this->emp->mainImage,
        ];

        return $data;
    }
}
