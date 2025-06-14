<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_agenda', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->time('time');
            $table->string('item');
            $table->text('description')->nullable();
            $table->string('speaker')->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->enum('type', ['presentation', 'break', 'discussion', 'networking', 'qa'])->default('presentation');
            $table->integer('order')->default(0);
            $table->timestamps();
            
            $table->index(['event_id', 'order']);
            $table->index(['event_id', 'time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_agenda');
    }
};
