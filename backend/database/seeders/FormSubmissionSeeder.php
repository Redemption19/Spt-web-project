<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FormSubmission;
use Faker\Factory as Faker;

class FormSubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();        // Create various types of form submissions
        $formTypes = [
            'pension_inquiry',
            'member_application',
            'claim_request',
            'complaint_form',
            'feedback_form',
            'document_request',
            'consultation_booking',
            'retirement_planning'
        ];

        $statuses = ['pending', 'processing', 'processed', 'replied', 'archived'];

        for ($i = 0; $i < 50; $i++) {
            $formType = $faker->randomElement($formTypes);
            $status = $faker->randomElement($statuses);
            $submittedAt = $faker->dateTimeBetween('-6 months', 'now');

            // Generate form data based on type
            $formData = $this->generateFormData($faker, $formType);

            FormSubmission::create([
                'form_type' => $formType,
                'form_data' => $formData,
                'submitted_at' => $submittedAt,
                'status' => $status,
                'processed_by' => $status !== 'pending' ? $faker->name() : null,
                'notes' => $status !== 'pending' ? $faker->sentence(10) : null,
                'email_sent' => $status === 'replied' || $status === 'processed',
                'ip_address' => $faker->ipv4(),
                'user_agent' => $faker->userAgent(),
                'created_at' => $submittedAt,
                'updated_at' => $faker->dateTimeBetween($submittedAt, 'now'),
            ]);
        }
    }

    private function generateFormData($faker, $formType)
    {
        $baseData = [
            'name' => $faker->name(),
            'email' => $faker->email(),
            'phone' => $faker->phoneNumber(),
        ];

        switch ($formType) {
            case 'pension_inquiry':
                return array_merge($baseData, [
                    'inquiry_type' => $faker->randomElement(['contribution', 'benefits', 'withdrawal', 'transfer']),
                    'current_employer' => $faker->company(),
                    'years_of_service' => $faker->numberBetween(1, 40),
                    'message' => $faker->paragraph(3),
                ]);

            case 'member_application':
                return array_merge($baseData, [
                    'date_of_birth' => $faker->date('Y-m-d', '-25 years'),
                    'national_id' => $faker->numerify('GHA-########-#'),
                    'employer' => $faker->company(),
                    'monthly_salary' => $faker->numberBetween(1000, 10000),
                    'employment_date' => $faker->date('Y-m-d', '-5 years'),
                ]);

            case 'claim_request':
                return array_merge($baseData, [
                    'claim_type' => $faker->randomElement(['retirement', 'death', 'disability', 'withdrawal']),
                    'member_id' => $faker->numerify('MEM####'),
                    'claim_amount' => $faker->numberBetween(10000, 500000),
                    'supporting_documents' => $faker->randomElements(['id_card', 'birth_certificate', 'medical_report', 'employment_letter'], $faker->numberBetween(1, 3)),
                ]);

            case 'complaint_form':
                return array_merge($baseData, [
                    'complaint_category' => $faker->randomElement(['service', 'payment', 'communication', 'technical', 'other']),
                    'incident_date' => $faker->date('Y-m-d', '-30 days'),
                    'description' => $faker->paragraph(4),
                    'desired_resolution' => $faker->sentence(8),
                ]);

            case 'feedback_form':
                return array_merge($baseData, [
                    'service_rating' => $faker->numberBetween(1, 5),
                    'website_rating' => $faker->numberBetween(1, 5),
                    'staff_rating' => $faker->numberBetween(1, 5),
                    'comments' => $faker->paragraph(3),
                    'recommend_to_others' => $faker->boolean(),
                ]);

            case 'document_request':
                return array_merge($baseData, [
                    'document_type' => $faker->randomElement(['statement', 'certificate', 'contribution_history', 'benefit_calculation']),
                    'member_id' => $faker->numerify('MEM####'),
                    'purpose' => $faker->sentence(6),
                    'delivery_method' => $faker->randomElement(['email', 'postal', 'pickup']),
                ]);

            case 'consultation_booking':
                return array_merge($baseData, [
                    'consultation_type' => $faker->randomElement(['retirement_planning', 'investment_advice', 'claim_assistance', 'general_inquiry']),
                    'preferred_date' => $faker->dateTimeBetween('now', '+2 months')->format('Y-m-d'),
                    'preferred_time' => $faker->randomElement(['morning', 'afternoon', 'evening']),
                    'topics_of_interest' => $faker->randomElements(['pensions', 'investments', 'insurance', 'retirement'], $faker->numberBetween(1, 3)),
                ]);

            case 'retirement_planning':
                return array_merge($baseData, [
                    'current_age' => $faker->numberBetween(25, 60),
                    'expected_retirement_age' => $faker->numberBetween(60, 70),
                    'current_savings' => $faker->numberBetween(10000, 1000000),
                    'monthly_contribution' => $faker->numberBetween(500, 5000),
                    'risk_tolerance' => $faker->randomElement(['conservative', 'moderate', 'aggressive']),
                    'goals' => $faker->paragraph(2),
                ]);

            default:
                return array_merge($baseData, [
                    'subject' => $faker->sentence(6),
                    'message' => $faker->paragraph(3),
                ]);
        }
    }
}
