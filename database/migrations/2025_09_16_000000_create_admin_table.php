<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin', function (Blueprint $table) {
            $table->id('id_admin');
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('login', 50)->unique();
            $table->string('password', 255);
            $table->string('email', 150)->unique()->nullable();
            $table->unsignedBigInteger('Unit_org')->nullable();
            $table->string('telephone', 20)->nullable();
            $table->timestamps();
            $table->rememberToken(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
};
