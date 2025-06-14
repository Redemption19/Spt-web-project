<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SurveyResponse;
use Faker\Factory as Faker;

class SurveyResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $surveyTypes = [
            'customer_satisfaction',
            'service_feedback',
            'website_usability',
            'product_feedback',
            'event_feedback',
            'retirement_planning_survey',
            'investment_preferences',
            'member_experience'
        ];        for ($i = 0; $i < 60; $i++) {
            $surveyType = $faker->randomElement($surveyTypes);
            $responses = $this->generateSurveyResponses($faker, $surveyType);
            $submittedAt = $faker->dateTimeBetween('-6 months', 'now');

            SurveyResponse::create([
                'survey_type' => $surveyType,
                'responses' => $responses,
                'submitted_at' => $submittedAt,
                'respondent_email' => $faker->optional(0.6)->email(),
                'respondent_name' => $faker->optional(0.5)->name(),
                'anonymous' => $faker->boolean(30), // 30% chance of being anonymous
                'completion_time' => $faker->numberBetween(120, 1800), // 2-30 minutes in seconds
                'source' => $faker->randomElement(['website', 'email', 'mobile_app']),
                'ip_address' => $faker->ipv4(),
                'session_id' => $faker->uuid(),
                'created_at' => $submittedAt,
                'updated_at' => $submittedAt,
            ]);
        }
    }

    private function generateSurveyResponses($faker, $surveyType)
    {
        switch ($surveyType) {
            case 'customer_satisfaction':
                return [
                    'overall_satisfaction' => $faker->numberBetween(1, 5),
                    'service_quality' => $faker->numberBetween(1, 5),
                    'response_time' => $faker->numberBetween(1, 5),
                    'staff_helpfulness' => $faker->numberBetween(1, 5),
                    'ease_of_process' => $faker->numberBetween(1, 5),
                    'likelihood_to_recommend' => $faker->numberBetween(1, 10),
                    'comments' => $faker->optional(0.7)->paragraph(2),
                    'improvement_suggestions' => $faker->optional(0.5)->sentence(8),
                ];

            case 'service_feedback':
                return [
                    'service_used' => $faker->randomElement(['pension_inquiry', 'contribution_payment', 'benefit_claim', 'account_management']),
                    'satisfaction_rating' => $faker->numberBetween(1, 5),
                    'process_clarity' => $faker->numberBetween(1, 5),
                    'time_taken' => $faker->randomElement(['very_fast', 'fast', 'reasonable', 'slow', 'very_slow']),
                    'met_expectations' => $faker->boolean(),
                    'would_use_again' => $faker->boolean(),
                    'feedback' => $faker->paragraph(3),
                ];

            case 'website_usability':
                return [
                    'ease_of_navigation' => $faker->numberBetween(1, 5),
                    'information_clarity' => $faker->numberBetween(1, 5),
                    'search_functionality' => $faker->numberBetween(1, 5),
                    'mobile_experience' => $faker->numberBetween(1, 5),
                    'loading_speed' => $faker->numberBetween(1, 5),
                    'overall_design' => $faker->numberBetween(1, 5),
                    'found_what_looking_for' => $faker->boolean(),
                    'most_useful_feature' => $faker->randomElement(['calculator', 'forms', 'resources', 'contact', 'member_portal']),
                    'suggestions' => $faker->optional(0.6)->sentence(10),
                ];

            case 'product_feedback':
                return [
                    'product_satisfaction' => $faker->numberBetween(1, 5),
                    'value_for_money' => $faker->numberBetween(1, 5),
                    'features_usefulness' => $faker->numberBetween(1, 5),
                    'performance' => $faker->numberBetween(1, 5),
                    'support_quality' => $faker->numberBetween(1, 5),
                    'missing_features' => $faker->optional(0.4)->sentence(6),
                    'most_liked_feature' => $faker->sentence(4),
                    'least_liked_feature' => $faker->optional(0.3)->sentence(4),
                ];

            case 'event_feedback':
                return [
                    'event_name' => $faker->sentence(4),
                    'overall_rating' => $faker->numberBetween(1, 5),
                    'content_quality' => $faker->numberBetween(1, 5),
                    'speaker_quality' => $faker->numberBetween(1, 5),
                    'venue_rating' => $faker->numberBetween(1, 5),
                    'organization' => $faker->numberBetween(1, 5),
                    'networking_opportunities' => $faker->numberBetween(1, 5),
                    'would_attend_again' => $faker->boolean(),
                    'recommend_to_others' => $faker->boolean(),
                    'most_valuable_session' => $faker->sentence(6),
                    'suggestions' => $faker->optional(0.5)->paragraph(2),
                ];

            case 'retirement_planning_survey':
                return [
                    'age_group' => $faker->randomElement(['25-34', '35-44', '45-54', '55-64', '65+']),
                    'retirement_confidence' => $faker->numberBetween(1, 5),
                    'savings_adequacy' => $faker->numberBetween(1, 5),
                    'financial_knowledge' => $faker->numberBetween(1, 5),
                    'planning_tools_used' => $faker->randomElements(['calculator', 'advisor', 'online_resources', 'seminars'], $faker->numberBetween(1, 3)),
                    'biggest_concern' => $faker->randomElement(['insufficient_savings', 'healthcare_costs', 'inflation', 'market_volatility']),
                    'retirement_age_goal' => $faker->numberBetween(55, 70),
                    'monthly_savings' => $faker->randomElement(['0-500', '501-1000', '1001-2000', '2001-5000', '5000+']),
                ];

            case 'investment_preferences':
                return [
                    'risk_tolerance' => $faker->randomElement(['very_conservative', 'conservative', 'moderate', 'aggressive', 'very_aggressive']),
                    'investment_experience' => $faker->randomElement(['none', 'limited', 'moderate', 'experienced', 'expert']),
                    'time_horizon' => $faker->randomElement(['1-3_years', '3-5_years', '5-10_years', '10+_years']),
                    'preferred_investments' => $faker->randomElements(['stocks', 'bonds', 'mutual_funds', 'real_estate', 'commodities'], $faker->numberBetween(1, 3)),
                    'investment_goals' => $faker->randomElements(['retirement', 'education', 'home_purchase', 'wealth_building'], $faker->numberBetween(1, 2)),
                    'information_sources' => $faker->randomElements(['financial_advisor', 'online_research', 'newspapers', 'tv_shows', 'friends_family'], $faker->numberBetween(1, 3)),
                ];

            case 'member_experience':
                return [
                    'membership_duration' => $faker->randomElement(['less_than_1_year', '1-3_years', '3-5_years', '5-10_years', '10+_years']),
                    'service_satisfaction' => $faker->numberBetween(1, 5),
                    'communication_effectiveness' => $faker->numberBetween(1, 5),
                    'problem_resolution' => $faker->numberBetween(1, 5),
                    'value_perception' => $faker->numberBetween(1, 5),
                    'member_benefits_awareness' => $faker->numberBetween(1, 5),
                    'most_used_service' => $faker->randomElement(['online_portal', 'phone_support', 'email_support', 'in_person_visits']),
                    'preferred_communication' => $faker->randomElement(['email', 'phone', 'sms', 'postal_mail', 'online_portal']),
                    'additional_services_interest' => $faker->randomElements(['financial_planning', 'investment_advice', 'insurance', 'estate_planning'], $faker->numberBetween(0, 2)),
                ];

            default:
                return [
                    'question_1' => $faker->sentence(8),
                    'rating_1' => $faker->numberBetween(1, 5),
                    'question_2' => $faker->sentence(6),
                    'rating_2' => $faker->numberBetween(1, 5),
                    'open_feedback' => $faker->paragraph(3),
                ];
        }
    }
}
