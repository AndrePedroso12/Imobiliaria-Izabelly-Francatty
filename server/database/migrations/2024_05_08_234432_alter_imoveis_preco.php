<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('imoveis', function (Blueprint $table) {
            $table->decimal('preco', 15, 2)->change(); // Change 'string' to whatever new type you want
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('imoveis', function (Blueprint $table) {
            // Define the column back to its original type
            $table->integer('preco')->change();
        });
    }
};
