<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\BlogPost;
use App\Models\Download;
use App\Models\NewsletterSubscription;
use App\Models\FormSubmission;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DashboardDataSeeder extends Seeder
{
    public function run(): void
    {
        // Update existing events with event_date if not set
        Event::whereNull('event_date')->each(function ($event) {
            $event->update([
                'event_date' => $event->date ?? Carbon::now()->addDays(rand(1, 30)),
                'registrations_count' => rand(5, 50)
            ]);
        });

        // Update existing blog posts with published_at if not set
        BlogPost::whereNull('published_at')->each(function ($post) {
            $post->update([
                'published_at' => Carbon::now()->subDays(rand(1, 60))
            ]);
        });

        // Update existing downloads with last_downloaded_at if not set
        Download::whereNull('last_downloaded_at')->each(function ($download) {
            $download->update([
                'last_downloaded_at' => Carbon::now()->subDays(rand(1, 30))
            ]);
        });

        // Update existing newsletter subscriptions with subscribed_at if not set
        NewsletterSubscription::whereNull('subscribed_at')->each(function ($subscription) {
            $subscription->update([
                'subscribed_at' => Carbon::now()->subDays(rand(1, 90))
            ]);
        });

        // Update existing event registrations with registered_at if not set
        EventRegistration::whereNull('registered_at')->each(function ($registration) {
            $registration->update([
                'registered_at' => Carbon::now()->subDays(rand(1, 30))
            ]);
        });

        // Create some sample form submissions if none exist
        if (FormSubmission::count() === 0) {
            $formTypes = ['contact', 'callback', 'pension_inquiry', 'complaint', 'feedback'];
            
            for ($i = 0; $i < 50; $i++) {
                FormSubmission::create([
                    'name' => fake()->name,
                    'email' => fake()->email,
                    'form_type' => fake()->randomElement($formTypes),
                    'message' => fake()->sentence(10),
                    'created_at' => Carbon::now()->subDays(rand(1, 60))
                ]);
            }
        }

        $this->command->info('Dashboard data seeded successfully!');
    }
}
