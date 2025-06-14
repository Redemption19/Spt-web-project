<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ContactForm;
use Faker\Factory as Faker;

class ContactFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $subjects = [
            'General Inquiry',
            'Pension Plan Information',
            'Contribution Questions',
            'Retirement Benefits',
            'Account Access Issues',
            'Investment Options',
            'Withdrawal Process',
            'Transfer Request',
            'Complaint Submission',
            'Technical Support',
            'Document Request',
            'Appointment Booking'
        ];        $statuses = ['new', 'read', 'replied', 'closed'];

        for ($i = 0; $i < 30; $i++) {
            $status = $faker->randomElement($statuses);
            $createdAt = $faker->dateTimeBetween('-3 months', 'now');
            
            ContactForm::create([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'phone' => $faker->optional(0.8)->phoneNumber(),
                'subject' => $faker->randomElement($subjects),
                'message' => $faker->paragraph($faker->numberBetween(3, 6)),
                'status' => $status,
                'reply_message' => $status === 'replied' || $status === 'closed' ? $faker->paragraph(4) : null,
                'replied_at' => $status === 'replied' || $status === 'closed' ? $faker->dateTimeBetween($createdAt, 'now') : null,
                'replied_by' => $status === 'replied' || $status === 'closed' ? $faker->name() : null,
                'priority' => $faker->randomElement(['low', 'normal', 'high', 'urgent']),
                'source' => 'website',
                'ip_address' => $faker->ipv4(),
                'created_at' => $createdAt,
                'updated_at' => $faker->dateTimeBetween($createdAt, 'now'),
            ]);
        }        // Create some high-priority contacts from recent dates
        for ($i = 0; $i < 5; $i++) {
            ContactForm::create([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'phone' => $faker->phoneNumber(),
                'subject' => 'URGENT: ' . $faker->randomElement([
                    'Payment Issue',
                    'Account Locked',
                    'Missing Contribution',
                    'Incorrect Benefit Calculation',
                    'System Error'
                ]),
                'message' => 'URGENT: ' . $faker->paragraph($faker->numberBetween(2, 4)),
                'status' => $faker->randomElement(['new', 'read']),
                'reply_message' => null,
                'replied_at' => null,
                'replied_by' => null,
                'priority' => 'urgent',
                'source' => 'website',
                'ip_address' => $faker->ipv4(),
                'created_at' => $faker->dateTimeBetween('-7 days', 'now'),
                'updated_at' => $faker->dateTimeBetween('-7 days', 'now'),
            ]);
        }
    }
}
