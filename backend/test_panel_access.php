<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

// Check admin user panel access
$user = App\Models\User::where('email', 'standardpensionsadmin@gmail.com')->first();

if ($user) {
    echo "Testing panel access for: " . $user->name . "\n";
    echo "Is Active: " . ($user->is_active ? 'Yes' : 'No') . "\n";
    echo "Roles: " . $user->roles->pluck('name')->implode(', ') . "\n";
    
    // Test individual role checks
    echo "Has Super Admin Role: " . ($user->hasRole('Super Admin') ? 'Yes' : 'No') . "\n";
    echo "Has Admin Role: " . ($user->hasRole('Admin') ? 'Yes' : 'No') . "\n";
    echo "Has Any Role (Super Admin, Admin, Editor, Manager): " . ($user->hasAnyRole(['Super Admin', 'Admin', 'Editor', 'Manager']) ? 'Yes' : 'No') . "\n";
    
    // Test panel access
    try {
        $panel = \Filament\Facades\Filament::getDefaultPanel();
        echo "Panel found: " . $panel->getId() . "\n";
        echo "Can Access Panel: " . ($user->canAccessPanel($panel) ? 'Yes' : 'No') . "\n";
    } catch (Exception $e) {
        echo "Error getting panel: " . $e->getMessage() . "\n";
    }
} else {
    echo "Admin user not found!\n";
}
