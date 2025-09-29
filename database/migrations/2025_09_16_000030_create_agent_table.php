<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agent', function (Blueprint $table) {
            $table->id('id_agent');
            $table->string('login', 50)->unique()->nullable();
            $table->string('password', 255);
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 150)->unique()->nullable();
            $table->string('telephone', 20)->nullable();
            $table->unsignedBigInteger('groupe')->nullable();
            $table->timestamp('date_activation')->useCurrent();
            $table->timestamp('date_expiration')->nullable();
            $table->unsignedBigInteger('cree_par');
            $table->boolean('est_superviseur')->default(false);
            $table->timestamps();

            $table->foreign('cree_par')->references('id_admin')->on('admin')->cascadeOnDelete();
            $table->index('groupe', 'idx_groupe');
            $table->index('login', 'idx_login_agent');
            $table->index('email', 'idx_email_agent');
        });

        Schema::table('agent', function (Blueprint $table) {
            $table->foreign('groupe')->references('id_groupe')->on('groupe')->nullOnDelete();
        });

        Schema::table('groupe', function (Blueprint $table) {
            $table->foreign('superviseur_id')->references('id_agent')->on('agent')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('groupe', function (Blueprint $table) {
            $table->dropForeign(['superviseur_id']);
        });

        Schema::table('agent', function (Blueprint $table) {
            $table->dropForeign(['groupe']);
            $table->dropIndex('idx_groupe');
            $table->dropIndex('idx_login_agent');
            $table->dropIndex('idx_email_agent');
        });
        Schema::dropIfExists('agent');
    }
};
