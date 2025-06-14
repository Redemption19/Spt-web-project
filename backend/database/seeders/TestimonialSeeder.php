<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Kwame Asante',
                'role' => 'Senior Manager',
                'company' => 'Ghana Commercial Bank',
                'image' => 'testimonials/kwame-asante.jpg',
                'message' => 'Joining this pension scheme was the best financial decision I ever made. The returns have been consistent and the customer service is exceptional. I feel confident about my retirement now.',
                'category' => 'pension_scheme',
                'rating' => 5,
                'featured' => true,
                'active' => true,
            ],
            [
                'name' => 'Akosua Mensah',
                'role' => 'Head of HR',
                'company' => 'MTN Ghana',
                'image' => 'testimonials/akosua-mensah.jpg',
                'message' => 'The flexibility of their pension products allowed me to customize my retirement plan according to my needs. The online portal makes it easy to track my contributions and growth.',
                'category' => 'pension_scheme',
                'rating' => 5,
                'featured' => true,
                'active' => true,
            ],
            [
                'name' => 'Joseph Osei',
                'role' => 'Business Owner',
                'company' => 'Osei Trading Enterprise',
                'image' => 'testimonials/joseph-osei.jpg',
                'message' => 'As a self-employed person, finding the right pension plan was challenging. Their team guided me through the process and helped me choose a plan that fits my irregular income perfectly.',
                'category' => 'retirement_planning',
                'rating' => 5,
                'featured' => true,
                'active' => true,
            ],
            [
                'name' => 'Efua Dartey',
                'role' => 'Doctor',
                'company' => 'Korle-Bu Teaching Hospital',
                'image' => 'testimonials/efua-dartey.jpg',
                'message' => 'The investment options available through their platform have given me excellent returns. I appreciate the transparency in all their dealings and the regular updates on my portfolio performance.',
                'category' => 'investment',
                'rating' => 5,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Samuel Boateng',
                'role' => 'Teacher',
                'company' => 'Ghana Education Service',
                'image' => 'testimonials/samuel-boateng.jpg',
                'message' => 'Their customer service team is always ready to help. Whenever I have questions about my pension, they provide clear and helpful answers. The mobile app is also very user-friendly.',
                'category' => 'customer_service',
                'rating' => 4,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Grace Nyong',
                'role' => 'Marketing Director',
                'company' => 'Unilever Ghana',
                'image' => 'testimonials/grace-nyong.jpg',
                'message' => 'I started my pension plan 15 years ago, and seeing the growth over the years has been amazing. The compound interest effect is real, and I\'m glad I started early.',
                'category' => 'pension_scheme',
                'rating' => 5,
                'featured' => true,
                'active' => true,
            ],
            [
                'name' => 'Charles Adjei',
                'role' => 'Engineer',
                'company' => 'VRA',
                'image' => 'testimonials/charles-adjei.jpg',
                'message' => 'The retirement planning workshop they organized for our company was very enlightening. It helped me understand the importance of starting early and making regular contributions.',
                'category' => 'retirement_planning',
                'rating' => 4,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Abena Owusu',
                'role' => 'Nurse',
                'company' => 'Ridge Hospital',
                'image' => 'testimonials/abena-owusu.jpg',
                'message' => 'The variety of investment funds available allowed me to diversify my retirement portfolio. I can choose between conservative and aggressive options based on my risk appetite.',
                'category' => 'investment',
                'rating' => 5,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Michael Amponsah',
                'role' => 'Accountant',
                'company' => 'KPMG Ghana',
                'image' => 'testimonials/michael-amponsah.jpg',
                'message' => 'Their digital platform is outstanding. I can easily monitor my contributions, check my balance, and even simulate different scenarios for my retirement planning.',
                'category' => 'general',
                'rating' => 5,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Sarah Addo',
                'role' => 'Pharmacist',
                'company' => 'Self-employed',
                'image' => 'testimonials/sarah-addo.jpg',
                'message' => 'Being self-employed, I needed a flexible pension plan. Their individual scheme allows me to contribute when I have good months and adjust during lean periods. Perfect for my needs!',
                'category' => 'pension_scheme',
                'rating' => 4,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Benjamin Tetteh',
                'role' => 'IT Consultant',
                'company' => 'Tech Solutions Ltd',
                'image' => 'testimonials/benjamin-tetteh.jpg',
                'message' => 'The online tools and calculators on their website helped me understand exactly how much I need to save for my retirement goals. Very helpful and easy to use.',
                'category' => 'retirement_planning',
                'rating' => 4,
                'featured' => false,
                'active' => true,
            ],
            [
                'name' => 'Victoria Asiedu',
                'role' => 'Bank Manager',
                'company' => 'Ecobank Ghana',
                'image' => 'testimonials/victoria-asiedu.jpg',
                'message' => 'What I love most is the transparency. I receive detailed statements showing exactly where my money is invested and how it\'s performing. No hidden fees or surprises.',
                'category' => 'general',
                'rating' => 5,
                'featured' => true,
                'active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        $this->command->info('Testimonials seeded successfully!');
    }
}
