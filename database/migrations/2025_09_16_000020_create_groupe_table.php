<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('groupe', function (Blueprint $table) {
            $table->id('id_groupe');
            $table->string('nom', 50)->unique();
            $table->string('domaine', 50);
            $table->unsignedBigInteger('superviseur_id')->nullable();
            $table->unsignedBigInteger('cree_par');
            $table->timestamps();

            // Removed FK to agent here; it will be added after agent table exists
            $table->foreign('cree_par')->references('id_admin')->on('admin')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('groupe');
    }
};
