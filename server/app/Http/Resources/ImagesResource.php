<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImagesResource extends JsonResource
{
    protected $imagem;

    public function __construct($imagem)
    {
        // Store the model instance
        $this->imagem = $imagem;
    }
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->imagem->id,
            'imagem' => '/api/imagem/' . $this->imagem->id,
        ];
        return $data;
    }
}
