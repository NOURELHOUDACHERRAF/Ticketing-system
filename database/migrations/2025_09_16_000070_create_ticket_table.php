<?php

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket', function (Blueprint $table) {
            $table->id('id_ticket');
            $table->string('numero_ticket', 50)->unique();
            $table->string('type', 200);
            $table->text('description');
            $table->enum('statut', array_column(TicketStatus::cases(), 'value'))->default(TicketStatus::NOUVEAU->value);
            $table->enum('priorite', array_column(TicketPriority::cases(), 'value'))->default(TicketPriority::NORMALE->value);
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('date_modification')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('date_resolution')->nullable();
            $table->unsignedBigInteger('utilisateur_id')->nullable();
            $table->unsignedBigInteger('agent_id')->nullable();
            $table->unsignedBigInteger('superviseur_id')->nullable();
            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->text('motif')->nullable();
            $table->timestamps();

            $table->foreign('utilisateur_id')->references('id_utilisateur')->on('utilisateur')->nullOnDelete();
            $table->foreign('agent_id')->references('id_agent')->on('agent')->nullOnDelete();
            $table->foreign('superviseur_id')->references('id_agent')->on('agent')->nullOnDelete();
            $table->foreign('categorie_id')->references('id_cat')->on('categorie')->nullOnDelete();

            $table->index('numero_ticket', 'idx_numero_ticket');
            $table->index('statut', 'idx_statut');
            $table->index('priorite', 'idx_priorite');
            $table->index('date_creation', 'idx_date_creation');
            $table->index('utilisateur_id', 'idx_client_id');
            $table->index('agent_id', 'idx_agent_id');
            $table->index('superviseur_id', 'idx_superviseur_id');
            $table->index('categorie_id', 'idx_categorie_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket');
    }
};
