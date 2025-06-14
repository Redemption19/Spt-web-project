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
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('form_type'); // contact, survey, application, etc.
            $table->json('form_data'); // All form fields in JSON format
            $table->timestamp('submitted_at');
            $table->enum('status', ['pending', 'processing', 'processed', 'replied', 'archived'])->default('pending');
            $table->string('processed_by')->nullable(); // Admin who processed it
            $table->text('notes')->nullable(); // Admin notes
            $table->string('pdf_path')->nullable(); // Generated PDF file path
            $table->boolean('email_sent')->default(false); // Email notification status
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
            
            $table->index(['form_type', 'status']);
            $table->index(['submitted_at']);
            $table->index(['status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
