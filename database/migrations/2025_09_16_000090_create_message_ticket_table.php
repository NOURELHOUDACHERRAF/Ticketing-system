<?php

use App\Enums\ActorType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('message_ticket', function (Blueprint $table) {
            $table->id('id_message');
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('expediteur_id');
            $table->enum('type_expediteur', array_column(ActorType::cases(), 'value'));
            $table->text('contenu');
            $table->timestamp('date_envoi')->useCurrent();
            $table->string('piece_jointe', 500)->nullable();
            $table->timestamps();

            $table->foreign('ticket_id')->references('id_ticket')->on('ticket')->cascadeOnDelete();
            $table->index('ticket_id', 'idx_ticket_message');
            $table->index(['expediteur_id', 'type_expediteur'], 'idx_expediteur');
            $table->index('date_envoi', 'idx_date_envoi_msg');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('message_ticket');
    }
};
