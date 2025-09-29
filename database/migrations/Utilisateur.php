<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateur', function (Blueprint $table) {
            $table->id('id_utilisateur');
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('login', 50)->unique();
            $table->string('password', 255);
            $table->string('email', 150)->unique()->nullable();
            $table->string('telephone', 20)->nullable();
            $table->unsignedBigInteger('cree_par')->nullable();
            $table->boolean('actif')->default(true);
            $table->timestamp('date_activation')->nullable();
            $table->timestamp('date_expiration')->nullable();
            $table->rememberToken();
            $table->timestamps();
            
            // Foreign key constraints
            $table->unsignedBigInteger('Unit_org');
            
                   $table->foreign('Unit_org')
                  ->references('id_unite_org')
                  ->on('unite_org')
                  ->onDelete('cascade');

            $table->foreign('cree_par')->references('id_admin')->on('admin')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateur');
    }
};