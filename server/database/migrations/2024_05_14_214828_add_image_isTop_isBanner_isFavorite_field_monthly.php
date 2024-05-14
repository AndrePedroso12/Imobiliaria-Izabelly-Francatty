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
            $table->text("mainImage")->nullable();
            $table->boolean("isTop")->nullable();
            $table->boolean("isFavorite")->nullable();
            $table->boolean("isBanner")->nullable();
            $table->decimal("monthly", 15, 2)->nullable();
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
