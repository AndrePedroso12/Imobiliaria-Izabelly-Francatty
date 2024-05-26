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
        Schema::table('imoveis', function (Blueprint $table) {

            $table->string("tipo")->nullable()->change();
            $table->string("pretensao")->nullable()->change();
            $table->string("rua")->nullable()->change();
            $table->string("bairro")->nullable()->change();
            $table->string("numero")->nullable()->change();
            $table->string("cidade")->nullable()->change();
            $table->string("complemento")->nullable()->change();
            $table->float("area_construida")->nullable()->default(0)->change();
            $table->float("area_terreno")->nullable()->default(0)->change();
            $table->integer("qtd_quartos")->nullable()->default(0)->change();
            $table->integer("qtd_Suites")->nullable()->default(0)->change();
            $table->integer("qtd_banheiros")->nullable()->default(0)->change();
            $table->integer("qtd_vagas_garagem")->nullable()->default(0)->change();
            $table->decimal("preco", 15, 2)->nullable()->default(0)->change();
            $table->text("descricao")->nullable()->change();
            $table->string("caracteristics")->nullable()->change();
            $table->string("vendedor")->nullable()->change();
            $table->string("contato_vendedor")->nullable()->change();
            $table->string("tags")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
