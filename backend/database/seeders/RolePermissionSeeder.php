<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Clear cache before seeding
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Blog Management
            'view_blog',
            'create_blog',
            'edit_blog',
            'delete_blog',
            'manage_blog_categories',
            'manage_blog_tags',
            'manage_blog_authors',

            // Event Management
            'view_events',
            'create_events',
            'edit_events',
            'delete_events',
            'manage_event_registrations',

            // Download Management
            'view_downloads',
            'create_downloads',
            'edit_downloads',
            'delete_downloads',

            // Gallery Management
            'view_gallery',
            'create_gallery',
            'edit_gallery',
            'delete_gallery',

            // Testimonial Management
            'view_testimonials',
            'create_testimonials',
            'edit_testimonials',
            'delete_testimonials',

            // Form Management
            'view_forms',
            'manage_form_submissions',
            'manage_contact_forms',
            'manage_surveys',

            // Newsletter Management
            'view_newsletter',
            'manage_newsletter_subscriptions',

            // Hero Section Management
            'view_hero_sections',
            'create_hero_sections',
            'edit_hero_sections',
            'delete_hero_sections',

            // User Management
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',

            // Role & Permission Management
            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',
            'view_permissions',
            'create_permissions',
            'edit_permissions',
            'delete_permissions',

            // Dashboard & Analytics
            'view_dashboard',
            'view_analytics',
            'export_data',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Super Admin - Full access
        $superAdmin = Role::create(['name' => 'Super Admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Admin - Almost full access except user management
        $admin = Role::create(['name' => 'Admin']);
        $adminPermissions = [
            'view_blog', 'create_blog', 'edit_blog', 'delete_blog',
            'manage_blog_categories', 'manage_blog_tags', 'manage_blog_authors',
            'view_events', 'create_events', 'edit_events', 'delete_events',
            'manage_event_registrations',
            'view_downloads', 'create_downloads', 'edit_downloads', 'delete_downloads',
            'view_gallery', 'create_gallery', 'edit_gallery', 'delete_gallery',
            'view_testimonials', 'create_testimonials', 'edit_testimonials', 'delete_testimonials',
            'view_forms', 'manage_form_submissions', 'manage_contact_forms', 'manage_surveys',
            'view_newsletter', 'manage_newsletter_subscriptions',
            'view_hero_sections', 'create_hero_sections', 'edit_hero_sections', 'delete_hero_sections',
            'view_dashboard', 'view_analytics', 'export_data',
        ];
        $admin->givePermissionTo($adminPermissions);

        // Content Manager - Content creation and editing
        $contentManager = Role::create(['name' => 'Content Manager']);
        $contentManagerPermissions = [
            'view_blog', 'create_blog', 'edit_blog',
            'manage_blog_categories', 'manage_blog_tags',
            'view_events', 'create_events', 'edit_events',
            'view_downloads', 'create_downloads', 'edit_downloads',
            'view_gallery', 'create_gallery', 'edit_gallery',
            'view_testimonials', 'create_testimonials', 'edit_testimonials',
            'view_hero_sections', 'create_hero_sections', 'edit_hero_sections',
            'view_dashboard',
        ];
        $contentManager->givePermissionTo($contentManagerPermissions);

        // Editor - Content editing only
        $editor = Role::create(['name' => 'Editor']);
        $editorPermissions = [
            'view_blog', 'edit_blog',
            'view_events', 'edit_events',
            'view_downloads', 'edit_downloads',
            'view_gallery', 'edit_gallery',
            'view_testimonials', 'edit_testimonials',
            'view_hero_sections', 'edit_hero_sections',
            'view_dashboard',
        ];
        $editor->givePermissionTo($editorPermissions);

        // Customer Support - Forms and communication management
        $support = Role::create(['name' => 'Customer Support']);
        $supportPermissions = [
            'view_forms', 'manage_form_submissions', 'manage_contact_forms', 'manage_surveys',
            'view_newsletter', 'manage_newsletter_subscriptions',
            'view_dashboard', 'view_analytics',
        ];
        $support->givePermissionTo($supportPermissions);

        // Viewer - Read-only access
        $viewer = Role::create(['name' => 'Viewer']);
        $viewerPermissions = [
            'view_blog', 'view_events', 'view_downloads', 'view_gallery',
            'view_testimonials', 'view_forms', 'view_newsletter',
            'view_hero_sections', 'view_dashboard',
        ];
        $viewer->givePermissionTo($viewerPermissions);

        // Assign Super Admin role to existing admin user
        $existingAdmin = User::where('email', 'standardpensionsadmin@gmail.com')->first();
        
        if ($existingAdmin) {
            $existingAdmin->update(['is_active' => true]);
            $existingAdmin->assignRole('Super Admin');
            $this->command->info('Existing admin user updated with Super Admin role:');
            $this->command->info('Email: standardpensionsadmin@gmail.com');
        } else {
            // Create a fallback Super Admin user if the existing one is not found
            $superAdminUser = User::create([
                'name' => 'Super Admin',
                'email' => 'admin@pensionwebsite.com',
                'password' => Hash::make('password123'),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);
            $superAdminUser->assignRole('Super Admin');
            $this->command->info('Fallback Super Admin created:');
            $this->command->info('Email: admin@pensionwebsite.com');
            $this->command->info('Password: password123');
        }

        $this->command->info('Roles and permissions seeded successfully!');
    }
}
