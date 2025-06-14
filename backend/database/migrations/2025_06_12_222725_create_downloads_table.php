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
        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('file_path');
            $table->string('category'); // forms, guides, reports, brochures, etc.
            $table->bigInteger('file_size')->default(0); // in bytes
            $table->integer('download_count')->default(0);
            $table->string('file_type')->nullable(); // pdf, doc, xls, etc.
            $table->string('version')->nullable(); // v1.0, v2.1, etc.
            $table->boolean('active')->default(true);
            $table->boolean('featured')->default(false);
            $table->boolean('requires_login')->default(false); // Some files might require authentication
            $table->json('tags')->nullable(); // For search and categorization
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            $table->index(['category', 'active']);
            $table->index(['featured', 'active']);
            $table->index('download_count');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('downloads');
    }
};
