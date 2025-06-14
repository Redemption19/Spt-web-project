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
        Schema::create('contact_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->enum('status', ['new', 'read', 'replied', 'closed'])->default('new');
            $table->timestamp('replied_at')->nullable();
            $table->string('replied_by')->nullable(); // Admin who replied
            $table->text('reply_message')->nullable();
            $table->string('priority', 20)->default('normal'); // low, normal, high, urgent
            $table->string('source')->default('website'); // website, mobile_app, etc.
            $table->string('ip_address')->nullable();
            $table->timestamps();
            
            $table->index(['status']);
            $table->index(['email']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_forms');
    }
};
