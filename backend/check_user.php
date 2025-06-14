<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

// Check if admin user exists
$user = App\Models\User::where('email', 'standardpensionsadmin@gmail.com')->first();

if ($user) {
    echo "Admin user found:\n";
    echo "Name: " . $user->name . "\n";
    echo "Email: " . $user->email . "\n";
    echo "Is Active: " . ($user->is_active ? 'Yes' : 'No') . "\n";
    echo "Roles: " . $user->roles->pluck('name')->implode(', ') . "\n";
    echo "Has Super Admin Role: " . ($user->hasRole('Super Admin') ? 'Yes' : 'No') . "\n";
    echo "Can Access Panel: " . ($user->canAccessPanel(app(\Filament\Panel::class)) ? 'Yes' : 'No') . "\n";
} else {
    echo "Admin user not found!\n";
    echo "Creating admin user...\n";
    
    // Create the admin user
    $user = App\Models\User::create([
        'name' => 'Standard Pensions Admin',
        'email' => 'standardpensionsadmin@gmail.com',
        'password' => bcrypt('admin123'),
        'is_active' => true,
    ]);
    
    // Assign Super Admin role
    $superAdminRole = Spatie\Permission\Models\Role::where('name', 'Super Admin')->first();
    if ($superAdminRole) {
        $user->assignRole($superAdminRole);
        echo "Admin user created and Super Admin role assigned!\n";
    } else {
        echo "Super Admin role not found!\n";
    }
}

// Check roles and permissions
echo "\nRoles in system:\n";
foreach (Spatie\Permission\Models\Role::all() as $role) {
    echo "- " . $role->name . " (permissions: " . $role->permissions->count() . ")\n";
}

echo "\nTotal permissions: " . Spatie\Permission\Models\Permission::count() . "\n";
