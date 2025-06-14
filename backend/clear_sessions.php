<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

echo "Clearing all sessions...\n";

try {
    $deleted = DB::table('sessions')->delete();
    echo "Deleted $deleted session records\n";
} catch (Exception $e) {
    echo "Error clearing sessions: " . $e->getMessage() . "\n";
}

echo "Sessions cleared successfully!\n";
