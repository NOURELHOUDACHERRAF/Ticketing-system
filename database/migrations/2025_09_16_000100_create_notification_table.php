<?php

use App\Enums\ActorType;
use App\Enums\NotificationType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification', function (Blueprint $table) {
            $table->id('id_notification');
            $table->unsignedBigInteger('destinataire_id');
            $table->enum('type_destinataire', array_column(ActorType::cases(), 'value'));
            $table->enum('type', array_column(NotificationType::cases(), 'value'));
            $table->string('titre', 200)->nullable();
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('message_id')->nullable();
            $table->timestamps();

            $table->foreign('ticket_id')->references('id_ticket')->on('ticket')->cascadeOnDelete();
            $table->foreign('message_id')->references('id_message')->on('message_ticket')->cascadeOnDelete();
            $table->index(['destinataire_id', 'type_destinataire'], 'idx_destinataire_notif');
            $table->index('type', 'idx_type');
            $table->index('ticket_id', 'idx_ticket_notif');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};
