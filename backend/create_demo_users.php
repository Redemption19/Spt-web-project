<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Hash;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

echo "Creating Admin user...\n";

// Create an Admin user
$adminUser = App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@standardpensions.com',
    'password' => Hash::make('admin123'),
    'is_active' => true,
]);

// Assign Admin role
$adminRole = Spatie\Permission\Models\Role::where('name', 'Admin')->first();
if ($adminRole) {
    $adminUser->assignRole($adminRole);
    echo "Admin user created successfully!\n";
    echo "Email: admin@standardpensions.com\n";
    echo "Password: admin123\n";
} else {
    echo "Admin role not found!\n";
}

// Also create some other role users for testing
echo "\nCreating other role users...\n";

$roles = ['Content Manager', 'Editor', 'Customer Support'];
foreach ($roles as $roleName) {
    $role = Spatie\Permission\Models\Role::where('name', $roleName)->first();
    if ($role) {
        $email = strtolower(str_replace(' ', '', $roleName)) . '@standardpensions.com';
        $user = App\Models\User::create([
            'name' => $roleName . ' User',
            'email' => $email,
            'password' => Hash::make('admin123'),
            'is_active' => true,
        ]);
        $user->assignRole($role);
        echo "Created: {$user->name} ({$user->email})\n";
    }
}

echo "\nAll demo users created with password: admin123\n";
