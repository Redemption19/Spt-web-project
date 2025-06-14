<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NewsletterSubscription;
use Faker\Factory as Faker;

class NewsletterSubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $sources = ['website', 'social_media', 'referral', 'event', 'advertisement'];
        $statuses = ['active', 'inactive', 'bounced', 'unsubscribed'];

        // Create active subscribers
        for ($i = 0; $i < 80; $i++) {
            NewsletterSubscription::create([
                'email' => $faker->unique()->email(),
                'name' => $faker->optional(0.7)->name(),
                'status' => 'active',
                'source' => $faker->randomElement($sources),
                'subscribed_at' => $faker->dateTimeBetween('-2 years', 'now'),
                'unsubscribed_at' => null,
                'created_at' => $faker->dateTimeBetween('-2 years', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 month', 'now'),
            ]);
        }

        // Create some unsubscribed users
        for ($i = 0; $i < 15; $i++) {
            $subscribedAt = $faker->dateTimeBetween('-2 years', '-1 month');
            $unsubscribedAt = $faker->dateTimeBetween($subscribedAt, 'now');
            
            NewsletterSubscription::create([
                'email' => $faker->unique()->email(),
                'name' => $faker->optional(0.6)->name(),
                'status' => 'unsubscribed',
                'source' => $faker->randomElement($sources),
                'subscribed_at' => $subscribedAt,
                'unsubscribed_at' => $unsubscribedAt,
                'created_at' => $subscribedAt,
                'updated_at' => $unsubscribedAt,
            ]);
        }

        // Create some bounced emails
        for ($i = 0; $i < 5; $i++) {
            $subscribedAt = $faker->dateTimeBetween('-1 year', '-1 month');
            
            NewsletterSubscription::create([
                'email' => $faker->unique()->email(),
                'name' => $faker->optional(0.5)->name(),
                'status' => 'bounced',
                'source' => $faker->randomElement($sources),
                'subscribed_at' => $subscribedAt,
                'unsubscribed_at' => null,
                'created_at' => $subscribedAt,
                'updated_at' => $faker->dateTimeBetween($subscribedAt, 'now'),
            ]);
        }

        // Create some inactive subscribers
        for ($i = 0; $i < 10; $i++) {
            $subscribedAt = $faker->dateTimeBetween('-2 years', '-6 months');
            
            NewsletterSubscription::create([
                'email' => $faker->unique()->email(),
                'name' => $faker->optional(0.4)->name(),
                'status' => 'inactive',
                'source' => $faker->randomElement($sources),
                'subscribed_at' => $subscribedAt,
                'unsubscribed_at' => null,
                'created_at' => $subscribedAt,
                'updated_at' => $faker->dateTimeBetween($subscribedAt, 'now'),
            ]);
        }

        // Create some recent subscribers (last 30 days)
        for ($i = 0; $i < 20; $i++) {
            $subscribedAt = $faker->dateTimeBetween('-30 days', 'now');
            
            NewsletterSubscription::create([
                'email' => $faker->unique()->email(),
                'name' => $faker->optional(0.8)->name(),
                'status' => 'active',
                'source' => $faker->randomElement($sources),
                'subscribed_at' => $subscribedAt,
                'unsubscribed_at' => null,
                'created_at' => $subscribedAt,
                'updated_at' => $subscribedAt,
            ]);
        }
    }
}
