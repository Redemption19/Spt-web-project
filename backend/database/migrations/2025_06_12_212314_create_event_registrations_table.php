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
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('organization')->nullable();
            $table->string('position')->nullable();
            $table->text('special_requirements')->nullable();
            $table->enum('status', ['confirmed', 'pending', 'cancelled', 'attended'])->default('confirmed');
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamp('checked_in_at')->nullable();
            $table->json('additional_info')->nullable();
            $table->timestamps();
            
            $table->unique(['event_id', 'email']);
            $table->index(['event_id', 'status']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
    }
};
