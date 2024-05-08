<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imoveis', function (Blueprint $table) {
            $table->id();
            $table->string("tipo");
            $table->float("pretensao");
            $table->string("rua");
            $table->string("bairro");
            $table->string("numero");
            $table->string("cidade");
            $table->string("complemento");
            $table->float("area_construida");
            $table->float("area_terreno");
            $table->integer("qtd_quartos");
            $table->integer("qtd_Suites");
            $table->integer("qtd_banheiros");
            $table->integer("qtd_vagas_garagem");
            $table->float("preco");
            $table->text("descricao");
            $table->string("caracteristics");
            $table->string("vendedor");
            $table->string("contato_vendedor");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imoveis');
    }
};
