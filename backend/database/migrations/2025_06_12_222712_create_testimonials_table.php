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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('company');
            $table->string('image')->nullable();
            $table->text('message');
            $table->string('category')->default('general'); // service, product, general, etc.
            $table->integer('rating')->default(5); // 1-5 star rating
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(true);
            $table->string('location')->nullable(); // City, Country
            $table->date('testimonial_date')->nullable(); // When testimonial was given
            $table->timestamps();
            
            $table->index(['category', 'active']);
            $table->index(['featured', 'active']);
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
