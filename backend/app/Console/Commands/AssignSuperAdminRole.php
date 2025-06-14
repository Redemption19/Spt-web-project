<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AssignSuperAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:assign-super-admin {email=standardpensionsadmin@gmail.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign Super Admin role to an existing user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User with email {$email} not found!");
            return 1;
        }

        // Ensure the user has the is_active field set
        if (!isset($user->is_active)) {
            $user->is_active = true;
            $user->save();
        }

        // Check if Super Admin role exists
        $superAdminRole = Role::where('name', 'Super Admin')->first();
        
        if (!$superAdminRole) {
            $this->error('Super Admin role not found! Please run the RolePermissionSeeder first.');
            $this->info('Run: php artisan db:seed --class=RolePermissionSeeder');
            return 1;
        }

        // Assign the Super Admin role
        if (!$user->hasRole('Super Admin')) {
            $user->assignRole('Super Admin');
            $this->info("Super Admin role assigned to {$user->name} ({$email})");
        } else {
            $this->info("User {$user->name} ({$email}) already has Super Admin role");
        }

        // Ensure user is active
        if (!$user->is_active) {
            $user->update(['is_active' => true]);
            $this->info("User activated");
        }

        $this->info("✅ Setup complete! You can now login with your admin credentials.");
        
        return 0;
    }
}
