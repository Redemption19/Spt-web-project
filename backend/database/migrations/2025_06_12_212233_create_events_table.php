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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('banner')->nullable();
            $table->date('date');
            $table->time('time');
            $table->string('venue');
            $table->integer('capacity')->default(0);
            $table->integer('current_attendees')->default(0);
            $table->enum('type', ['webinar', 'physical'])->default('physical');
            $table->string('region')->nullable();
            $table->enum('status', ['draft', 'published', 'cancelled', 'completed'])->default('draft');
            $table->string('registration_link')->nullable();
            $table->string('map_link')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->decimal('price', 8, 2)->default(0.00);
            $table->text('requirements')->nullable();
            $table->json('contact_info')->nullable();
            $table->timestamp('registration_deadline')->nullable();
            $table->timestamps();
            
            $table->index(['status', 'date']);
            $table->index('type');
            $table->index('region');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
