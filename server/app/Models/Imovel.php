<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imovel extends Model
{
    use HasFactory;
    protected $table = 'imoveis';

    protected $fillable = [
        "tipo",
        "pretensao",
        "rua",
        "bairro",
        "numero",
        "cidade",
        "complemento",
        "area_construida",
        "area_terreno",
        "qtd_quartos",
        "qtd_Suites",
        "qtd_banheiros",
        "qtd_vagas_garagem",
        "preco",
        "rent",
        "descricao",
        "caracteristics",
        "vendedor",
        "contato_vendedor",
        "tags",
        'mainImage',
        'isTop',
        'isFavorite',
        'isBanner',
        'monthly',
        'video',
        'comments'
    ];

    public function images()
    {
        return $this->hasMany(Images::class);
    }
}