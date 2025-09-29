<?php

use App\Enums\ActionType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historique', function (Blueprint $table) {
            $table->id('id_historique');
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('utilisateur_id')->nullable();
            $table->unsignedBigInteger('agent_id')->nullable();
            $table->string('action', 100);
            $table->timestamp('date_action')->useCurrent();
            $table->text('commentaire')->nullable();
            $table->enum('type_action', array_column(ActionType::cases(), 'value'))->default(ActionType::MODIFICATION->value);
            $table->timestamps();

            $table->foreign('ticket_id')->references('id_ticket')->on('ticket')->cascadeOnDelete();
            $table->foreign('utilisateur_id')->references('id_utilisateur')->on('utilisateur')->nullOnDelete();
            $table->foreign('agent_id')->references('id_agent')->on('agent')->nullOnDelete();
            $table->index('ticket_id', 'idx_ticket_id_hist');
            $table->index('date_action', 'idx_date_action');
            $table->index('type_action', 'idx_type_action');
            $table->index('utilisateur_id', 'idx_utilisateur_hist');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historique');
    }
};
