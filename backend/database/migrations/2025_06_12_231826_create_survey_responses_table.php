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
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->string('survey_type'); // customer_satisfaction, product_feedback, market_research, etc.
            $table->json('responses'); // All survey answers in JSON format
            $table->timestamp('submitted_at');
            $table->string('respondent_email')->nullable();
            $table->string('respondent_name')->nullable();
            $table->boolean('anonymous')->default(false);
            $table->integer('completion_time')->nullable(); // Time taken to complete in seconds
            $table->string('source')->default('website'); // website, email, mobile_app, etc.
            $table->string('ip_address')->nullable();
            $table->string('session_id')->nullable();
            $table->timestamps();
            
            $table->index(['survey_type']);
            $table->index(['submitted_at']);
            $table->index(['respondent_email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
    }
};
