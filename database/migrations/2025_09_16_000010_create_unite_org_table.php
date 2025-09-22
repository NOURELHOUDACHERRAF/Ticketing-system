<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('unite_org', function (Blueprint $table) {
            $table->integer('Num')->primary();
            $table->string('nom', 100);
            $table->string('Abreviation', 50)->nullable();
            $table->index('Num', 'idx_Num');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unite_org');
    }
};
