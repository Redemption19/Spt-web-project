<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventSpeaker;
use App\Models\EventAgenda;
use App\Models\EventRegistration;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only create data if no events exist to avoid duplicates
        if (Event::count() > 0) {
            $this->command->info('Events already exist. Skipping seeder.');
            return;
        }

        $this->command->info('Creating upcoming events...');
        $this->createUpcomingEvents();
        
        $this->command->info('Creating past events...');
        $this->createPastEvents();
        
        $this->command->info('Creating draft events...');
        $this->createDraftEvents();
        
        $this->command->info('Event seeding completed successfully!');
    }

    private function createUpcomingEvents()
    {
        // 1. Featured Webinar - Digital Pension Management
        $webinar = Event::create([
            'title' => 'Digital Pension Management: Future of Retirement Planning',
            'slug' => 'digital-pension-management-2025',
            'description' => 'Join us for an insightful webinar exploring the latest trends in digital pension management, AI-powered retirement planning, and the future of pension schemes in Ghana. Learn from industry experts about innovative technologies transforming how we approach retirement savings.',
            'date' => Carbon::now()->addDays(15),
            'time' => '14:00:00',
            'venue' => 'Virtual Event (Zoom)',
            'capacity' => 500,
            'current_attendees' => 234,
            'type' => 'webinar',
            'region' => 'National',
            'status' => 'published',
            'registration_link' => 'https://zoom.us/j/1234567890',
            'is_featured' => true,
            'price' => 0.00,
            'requirements' => 'Stable internet connection, laptop/desktop computer, notepad for taking notes',
            'contact_info' => [
                'email' => 'events@pensionscheme.com',
                'phone' => '+233 24 123 4567',
                'whatsapp' => '+233 24 123 4567'
            ],
            'registration_deadline' => Carbon::now()->addDays(13),
        ]);

        // Add speakers for webinar
        EventSpeaker::create([
            'event_id' => $webinar->id,
            'name' => 'Dr. Kwame Asante',
            'bio' => 'Leading expert in pension fund management with over 20 years of experience. Former Director of National Pensions Regulatory Authority.',
            'company' => 'Ghana Pension Fund Association',
            'position' => 'Chief Executive Officer',
            'linkedin' => 'https://linkedin.com/in/kwame-asante',
            'email' => 'k.asante@gpfa.org',
            'is_keynote' => true,
            'order' => 1,
        ]);

        EventSpeaker::create([
            'event_id' => $webinar->id,
            'name' => 'Sarah Mensah',
            'bio' => 'Tech entrepreneur and fintech specialist focusing on digital solutions for financial services in Africa.',
            'company' => 'FinTech Ghana',
            'position' => 'Founder & CEO',
            'linkedin' => 'https://linkedin.com/in/sarah-mensah',
            'twitter' => '@sarahmensah_gh',
            'is_keynote' => false,
            'order' => 2,
        ]);

        // Add agenda for webinar
        EventAgenda::create([
            'event_id' => $webinar->id,
            'time' => '14:00:00',
            'item' => 'Welcome & Opening Remarks',
            'description' => 'Introduction to the webinar and overview of agenda',
            'speaker' => 'Event Host',
            'duration_minutes' => 10,
            'type' => 'presentation',
            'order' => 1,
        ]);

        EventAgenda::create([
            'event_id' => $webinar->id,
            'time' => '14:10:00',
            'item' => 'The Digital Revolution in Pension Management',
            'description' => 'Keynote presentation on how technology is transforming pension schemes globally and in Ghana',
            'speaker' => 'Dr. Kwame Asante',
            'duration_minutes' => 30,
            'type' => 'presentation',
            'order' => 2,
        ]);

        EventAgenda::create([
            'event_id' => $webinar->id,
            'time' => '14:40:00',
            'item' => 'FinTech Solutions for Retirement Planning',
            'description' => 'Exploring innovative digital tools and platforms for pension management',
            'speaker' => 'Sarah Mensah',
            'duration_minutes' => 25,
            'type' => 'presentation',
            'order' => 3,
        ]);

        EventAgenda::create([
            'event_id' => $webinar->id,
            'time' => '15:05:00',
            'item' => 'Q&A Session',
            'description' => 'Interactive questions and answers with speakers',
            'duration_minutes' => 20,
            'type' => 'qa',
            'order' => 4,
        ]);

        // Add some registrations for webinar
        $this->createRegistrations($webinar->id, 25);

        // 2. Physical Conference - Pension Reforms Workshop
        $conference = Event::create([
            'title' => 'Annual Pension Reforms Workshop 2025',
            'slug' => 'pension-reforms-workshop-2025',
            'description' => 'A comprehensive workshop bringing together pension industry stakeholders to discuss recent reforms, regulatory changes, and best practices in pension administration. Network with peers and learn from regulatory experts.',
            'date' => Carbon::now()->addDays(30),
            'time' => '09:00:00',
            'venue' => 'Kempinski Hotel Gold Coast City, Accra',
            'capacity' => 150,
            'current_attendees' => 87,
            'type' => 'physical',
            'region' => 'Greater Accra',
            'status' => 'published',
            'map_link' => 'https://maps.google.com/?q=Kempinski+Hotel+Accra',
            'is_featured' => false,
            'price' => 250.00,
            'requirements' => 'Business attire required, bring notepad and pen, networking cards recommended',
            'contact_info' => [
                'email' => 'workshop@pensionscheme.com',
                'phone' => '+233 30 123 4567'
            ],
            'registration_deadline' => Carbon::now()->addDays(25),
        ]);

        // Add speakers for conference
        EventSpeaker::create([
            'event_id' => $conference->id,
            'name' => 'Hon. Patricia Adusei',
            'bio' => 'Minister of Employment and Labour Relations with extensive experience in social security policy development.',
            'company' => 'Ministry of Employment and Labour Relations',
            'position' => 'Minister',
            'is_keynote' => true,
            'order' => 1,
        ]);

        EventSpeaker::create([
            'event_id' => $conference->id,
            'name' => 'Prof. Emmanuel Nkansah',
            'bio' => 'Academic researcher specializing in pension economics and social security systems in developing countries.',
            'company' => 'University of Ghana Business School',
            'position' => 'Professor of Finance',
            'linkedin' => 'https://linkedin.com/in/emmanuel-nkansah',
            'order' => 2,
        ]);

        EventSpeaker::create([
            'event_id' => $conference->id,
            'name' => 'Michael Dei-Tumi',
            'bio' => 'Pension fund administrator with deep knowledge of regulatory compliance and fund management.',
            'company' => 'Enterprise Trustees Limited',
            'position' => 'Managing Director',
            'order' => 3,
        ]);

        // Add agenda for conference
        $conferenceAgenda = [
            ['09:00:00', 'Registration & Welcome Coffee', 'Networking and registration check-in', '', 30, 'networking'],
            ['09:30:00', 'Opening Ceremony', 'Welcome remarks and event overview', 'Event Coordinator', 15, 'presentation'],
            ['09:45:00', 'Keynote: Future of Pension Reforms in Ghana', 'Policy perspectives on upcoming pension legislation', 'Hon. Patricia Adusei', 45, 'presentation'],
            ['10:30:00', 'Coffee Break', 'Networking break with refreshments', '', 15, 'break'],
            ['10:45:00', 'Regulatory Compliance Updates', 'Latest changes in pension regulations and compliance requirements', 'Michael Dei-Tumi', 60, 'presentation'],
            ['11:45:00', 'Academic Perspective on Pension Economics', 'Research insights on pension system effectiveness', 'Prof. Emmanuel Nkansah', 45, 'presentation'],
            ['12:30:00', 'Lunch Break', 'Networking lunch', '', 60, 'break'],
            ['13:30:00', 'Panel Discussion: Implementation Challenges', 'Interactive discussion on practical implementation issues', 'All Speakers', 60, 'discussion'],
            ['14:30:00', 'Workshops & Breakout Sessions', 'Hands-on workshops on specific topics', 'Various Experts', 90, 'presentation'],
            ['16:00:00', 'Closing Remarks & Next Steps', 'Summary and future actions', 'Event Coordinator', 15, 'presentation'],
        ];

        foreach ($conferenceAgenda as $index => $agenda) {
            EventAgenda::create([
                'event_id' => $conference->id,
                'time' => $agenda[0],
                'item' => $agenda[1],
                'description' => $agenda[2],
                'speaker' => $agenda[3],
                'duration_minutes' => $agenda[4],
                'type' => $agenda[5],
                'order' => $index + 1,
            ]);
        }

        // Add registrations for conference
        $this->createRegistrations($conference->id, 30);

        // 3. Regional Seminar
        $seminar = Event::create([
            'title' => 'Northern Region Pension Awareness Seminar',
            'slug' => 'northern-pension-awareness-seminar',
            'description' => 'Educational seminar aimed at increasing pension awareness among workers in the Northern Region. Learn about your pension rights, benefits, and how to maximize your retirement savings.',
            'date' => Carbon::now()->addDays(45),
            'time' => '10:00:00',
            'venue' => 'Tamale Cultural Centre',
            'capacity' => 200,
            'current_attendees' => 156,
            'type' => 'physical',
            'region' => 'Northern Region',
            'status' => 'published',
            'map_link' => 'https://maps.google.com/?q=Tamale+Cultural+Centre',
            'price' => 0.00,
            'requirements' => 'Bring ID for registration verification',
            'contact_info' => [
                'email' => 'northern@pensionscheme.com',
                'phone' => '+233 37 123 4567'
            ],
            'registration_deadline' => Carbon::now()->addDays(40),
        ]);

        // Add basic speaker for seminar
        EventSpeaker::create([
            'event_id' => $seminar->id,
            'name' => 'Ibrahim Mohammed',
            'bio' => 'Regional pension education coordinator with expertise in community outreach and financial literacy.',
            'company' => 'Social Security and National Insurance Trust',
            'position' => 'Regional Education Officer',
            'is_keynote' => true,
            'order' => 1,
        ]);

        // Add simple agenda for seminar
        EventAgenda::create([
            'event_id' => $seminar->id,
            'time' => '10:00:00',
            'item' => 'Understanding Your Pension Rights',
            'description' => 'Basic introduction to pension schemes and worker rights',
            'speaker' => 'Ibrahim Mohammed',
            'duration_minutes' => 90,
            'type' => 'presentation',
            'order' => 1,
        ]);

        EventAgenda::create([
            'event_id' => $seminar->id,
            'time' => '11:30:00',
            'item' => 'Questions & Personal Consultations',
            'description' => 'Individual consultations and group Q&A',
            'speaker' => 'Ibrahim Mohammed',
            'duration_minutes' => 60,
            'type' => 'qa',
            'order' => 2,
        ]);

        // Add registrations for seminar
        $this->createRegistrations($seminar->id, 45);
    }

    private function createPastEvents()
    {
        // Past event for testing
        $pastEvent = Event::create([
            'title' => 'Digital Transformation in Pension Management',
            'slug' => 'digital-transformation-pension-2024',
            'description' => 'A successful conference that explored digital innovations in pension management.',
            'date' => Carbon::now()->subDays(30),
            'time' => '09:00:00',
            'venue' => 'Movenpick Ambassador Hotel, Accra',
            'capacity' => 120,
            'current_attendees' => 118,
            'type' => 'physical',
            'region' => 'Greater Accra',
            'status' => 'completed',
            'price' => 200.00,
        ]);

        EventSpeaker::create([
            'event_id' => $pastEvent->id,
            'name' => 'Dr. Akosua Frimpong',
            'bio' => 'Digital transformation expert',
            'company' => 'Tech Solutions Ghana',
            'position' => 'CTO',
            'is_keynote' => true,
            'order' => 1,
        ]);

        // Add some registrations with attended status
        $this->createRegistrations($pastEvent->id, 25, 'attended');
    }

    private function createDraftEvents()
    {
        // Draft event for testing
        Event::create([
            'title' => 'Youth and Pension Planning Workshop',
            'slug' => 'youth-pension-planning-workshop',
            'description' => 'Workshop targeting young professionals to educate them about early pension planning.',
            'date' => Carbon::now()->addDays(60),
            'time' => '14:00:00',
            'venue' => 'University of Ghana, Great Hall',
            'capacity' => 300,
            'current_attendees' => 0,
            'type' => 'physical',
            'region' => 'Greater Accra',
            'status' => 'draft',
            'price' => 0.00,
        ]);
    }

    private function createRegistrations($eventId, $count, $status = 'confirmed')
    {
        $firstNames = ['Kwame', 'Akosua', 'Kofi', 'Ama', 'Yaw', 'Adwoa', 'Kwaku', 'Efua', 'Kojo', 'Abena', 'Fiifi', 'Araba', 'Kwesi', 'Adjoa', 'Nana'];
        $lastNames = ['Asante', 'Mensah', 'Osei', 'Boateng', 'Owusu', 'Agyeman', 'Appiah', 'Adjei', 'Amoah', 'Ntim', 'Sarfo', 'Antwi', 'Yeboah', 'Darko', 'Amponsah'];
        $organizations = ['SSNIT', 'Enterprise Trustees', 'OIC Pension Fund', 'Star Assurance', 'GLICO Pension', 'Petra Trust', 'Ultimate Pensions', 'First National Pensions', 'Dalex Finance', 'Republic Bank Ghana'];
        $positions = ['Manager', 'Officer', 'Supervisor', 'Analyst', 'Coordinator', 'Specialist', 'Administrator', 'Executive', 'Director', 'Consultant'];

        for ($i = 0; $i < $count; $i++) {
            $firstName = $firstNames[array_rand($firstNames)];
            $lastName = $lastNames[array_rand($lastNames)];
            $organization = $organizations[array_rand($organizations)];
            $position = $positions[array_rand($positions)];
            
            EventRegistration::create([
                'event_id' => $eventId,
                'name' => $firstName . ' ' . $lastName,
                'email' => strtolower($firstName . '.' . $lastName . '@' . str_replace(' ', '', $organization) . '.com'),
                'phone' => '+233 ' . rand(20, 59) . ' ' . rand(100, 999) . ' ' . rand(1000, 9999),
                'organization' => $organization,
                'position' => $position,
                'status' => $status,
                'registered_at' => Carbon::now()->subDays(rand(1, 20)),
                'checked_in_at' => $status === 'attended' ? Carbon::now()->subDays(rand(1, 10)) : null,
            ]);
        }
    }
}
