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
        Schema::table('downloads', function (Blueprint $table) {
            $table->timestamp('last_downloaded_at')->nullable()->after('download_count');
        });
        
        // Update existing records to have a last_downloaded_at value
        DB::table('downloads')->update([
            'last_downloaded_at' => DB::raw('NOW()')
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('downloads', function (Blueprint $table) {
            $table->dropColumn('last_downloaded_at');
        });
    }
};
