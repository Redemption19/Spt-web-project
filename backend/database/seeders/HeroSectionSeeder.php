<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HeroSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $heroSections = [
            [
                'page' => 'home',
                'title' => 'Secure Your Future with Our Pension Plans',
                'subtitle' => 'Build a retirement fund that gives you peace of mind and financial security for your golden years.',
                'background_image' => 'hero-sections/home-hero.jpg',
                'cta_text' => 'Get Started Today',
                'cta_link' => '/schemes',
                'active' => true,
            ],
            [
                'page' => 'about',
                'title' => 'Trusted Partner in Retirement Planning',
                'subtitle' => 'With over 20 years of experience, we have helped thousands of Ghanaians secure their financial future.',
                'background_image' => 'hero-sections/about-hero.jpg',
                'cta_text' => 'Learn More About Us',
                'cta_link' => '/about/our-story',
                'active' => true,
            ],
            [
                'page' => 'schemes',
                'title' => 'Choose the Perfect Pension Scheme',
                'subtitle' => 'Explore our comprehensive range of pension products designed to meet your unique retirement goals.',
                'background_image' => 'hero-sections/schemes-hero.jpg',
                'cta_text' => 'Compare Schemes',
                'cta_link' => '/pension-calculator',
                'active' => true,
            ],
            [
                'page' => 'services',
                'title' => 'Comprehensive Retirement Services',
                'subtitle' => 'From pension planning to investment advisory, we provide all the services you need for a secure retirement.',
                'background_image' => 'hero-sections/services-hero.jpg',
                'cta_text' => 'Explore Services',
                'cta_link' => '/services/pension-planning',
                'active' => true,
            ],
            [
                'page' => 'contact',
                'title' => 'Get Expert Advice Today',
                'subtitle' => 'Speak with our pension experts and get personalized advice for your retirement planning needs.',
                'background_image' => 'hero-sections/contact-hero.jpg',
                'cta_text' => 'Contact Us Now',
                'cta_link' => '/contact/consultation',
                'active' => true,
            ],
            [
                'page' => 'member-portal',
                'title' => 'Welcome to Your Member Portal',
                'subtitle' => 'Access your pension account, track contributions, and manage your retirement investments all in one place.',
                'background_image' => 'hero-sections/portal-hero.jpg',
                'cta_text' => 'Login to Portal',
                'cta_link' => '/member-portal/login',
                'active' => true,
            ],
            [
                'page' => 'testimonials',
                'title' => 'Stories from Our Members',
                'subtitle' => 'Hear from satisfied members who have successfully secured their retirement with our pension schemes.',
                'background_image' => 'hero-sections/testimonials-hero.jpg',
                'cta_text' => 'Join Our Community',
                'cta_link' => '/schemes/individual',
                'active' => true,
            ],
            [
                'page' => 'home_alt',
                'title' => 'Your Retirement Dreams Start Here',
                'subtitle' => 'Take control of your financial future with Ghana\'s most trusted pension provider.',
                'background_image' => 'hero-sections/home-alt-hero.jpg',
                'cta_text' => 'Start Planning',
                'cta_link' => '/pension-calculator',
                'active' => false, // Alternative hero for A/B testing
            ],
        ];

        foreach ($heroSections as $heroSection) {
            HeroSection::create($heroSection);
        }

        $this->command->info('Hero sections seeded successfully!');
    }
}
