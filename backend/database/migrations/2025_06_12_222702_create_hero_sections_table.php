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
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page')->index(); // home, about, services, contact, etc.
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('background_image')->nullable();
            $table->string('cta_text')->nullable(); // Call to Action text
            $table->string('cta_link')->nullable(); // Call to Action link
            $table->boolean('active')->default(true);
            $table->integer('order')->default(0); // For ordering multiple hero sections
            $table->json('additional_content')->nullable(); // For extra fields like description, features, etc.
            $table->timestamps();
            
            $table->index(['page', 'active']);
            $table->index(['page', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
