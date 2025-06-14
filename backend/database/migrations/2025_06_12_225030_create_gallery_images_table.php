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
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('gallery_categories')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_path');
            $table->string('alt_text')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('image_size')->nullable(); // stores file size in KB
            $table->string('image_dimensions')->nullable(); // stores width x height
            $table->integer('views')->default(0);
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamps();
            
            $table->index(['category_id', 'active', 'sort_order']);
            $table->index(['featured', 'active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_images');
    }
};
