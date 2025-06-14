<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

// Test authentication
$email = 'standardpensionsadmin@gmail.com';
$password = 'admin123';

echo "Testing authentication for: $email\n";

$user = App\Models\User::where('email', $email)->first();

if ($user) {
    echo "User found: " . $user->name . "\n";
    echo "Password hash in database: " . substr($user->password, 0, 20) . "...\n";
    
    // Test password verification
    $passwordCheck = Hash::check($password, $user->password);
    echo "Password check: " . ($passwordCheck ? 'PASS' : 'FAIL') . "\n";
    
    if (!$passwordCheck) {
        echo "Updating password to 'admin123'...\n";
        $user->password = Hash::make($password);
        $user->save();
        echo "Password updated successfully!\n";
    }
    
    // Test manual authentication
    try {
        Auth::login($user);
        echo "Manual authentication: " . (Auth::check() ? 'SUCCESS' : 'FAILED') . "\n";
        echo "Authenticated user: " . (Auth::user() ? Auth::user()->name : 'None') . "\n";
    } catch (Exception $e) {
        echo "Authentication error: " . $e->getMessage() . "\n";
    }
} else {
    echo "User not found!\n";
}
