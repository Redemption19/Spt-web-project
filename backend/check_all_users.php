<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

echo "=== ALL USERS IN SYSTEM ===\n";
$users = App\Models\User::with('roles')->get();

foreach ($users as $user) {
    echo "ID: {$user->id}\n";
    echo "Name: {$user->name}\n";
    echo "Email: {$user->email}\n";
    echo "Active: " . ($user->is_active ? 'Yes' : 'No') . "\n";
    echo "Roles: " . $user->roles->pluck('name')->implode(', ') . "\n";
    echo "Can Access Panel: " . ($user->canAccessPanel(app(\Filament\Panel::class)) ? 'Yes' : 'No') . "\n";
    echo "---\n";
}

echo "\nTotal users: " . $users->count() . "\n";

// Check if there's an Admin role user
$adminUsers = App\Models\User::whereHas('roles', function($query) {
    $query->where('name', 'Admin');
})->get();

echo "\nUsers with Admin role: " . $adminUsers->count() . "\n";
foreach ($adminUsers as $user) {
    echo "- {$user->name} ({$user->email}) - Active: " . ($user->is_active ? 'Yes' : 'No') . "\n";
}
