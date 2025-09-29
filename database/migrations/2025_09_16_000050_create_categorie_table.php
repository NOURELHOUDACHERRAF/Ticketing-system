<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categorie', function (Blueprint $table) {
            $table->id('id_cat');
            $table->string('Nom', 100);
            $table->string('description', 255)->nullable();
            $table->unsignedBigInteger('id_grp');
            $table->timestamps();

            $table->foreign('id_grp')->references('id_groupe')->on('groupe')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categorie');
    }
};
