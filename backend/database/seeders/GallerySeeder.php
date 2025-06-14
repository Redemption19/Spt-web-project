<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Gallery Categories
        $categories = [
            [
                'name' => 'Office Events',
                'slug' => 'office-events',
                'description' => 'Photos from our office events, team building activities, and corporate gatherings.',
                'active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Member Activities',
                'slug' => 'member-activities',
                'description' => 'Images from member engagement activities, workshops, and educational seminars.',
                'active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Awards & Recognition',
                'slug' => 'awards-recognition',
                'description' => 'Photos from award ceremonies and recognition events.',
                'active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Community Outreach',
                'slug' => 'community-outreach',
                'description' => 'Images from our community service and outreach programs.',
                'active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Facilities',
                'slug' => 'facilities',
                'description' => 'Photos of our office spaces, facilities, and infrastructure.',
                'active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Team Photos',
                'slug' => 'team-photos',
                'description' => 'Professional photos of our team members and leadership.',
                'active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = GalleryCategory::create($categoryData);
            
            // Create sample images for each category
            $this->createImagesForCategory($category);
        }

        $this->command->info('Gallery data seeded successfully!');
    }

    private function createImagesForCategory(GalleryCategory $category)
    {
        $imageData = $this->getImageDataForCategory($category->slug);
        
        foreach ($imageData as $imageInfo) {
            GalleryImage::create([
                'category_id' => $category->id,
                'title' => $imageInfo['title'],
                'description' => $imageInfo['description'],
                'image_path' => $imageInfo['image_path'],
                'alt_text' => $imageInfo['alt_text'],
                'featured' => $imageInfo['featured'] ?? false,
                'active' => true,
                'sort_order' => $imageInfo['sort_order'] ?? 0,
                'image_size' => $imageInfo['image_size'] ?? rand(500, 2000),
                'image_dimensions' => $imageInfo['image_dimensions'] ?? '1920x1080',
                'views' => $imageInfo['views'] ?? rand(0, 500),
                'uploaded_at' => now()->subDays(rand(1, 365)),
            ]);
        }
    }

    private function getImageDataForCategory(string $categorySlug): array
    {
        switch ($categorySlug) {
            case 'office-events':
                return [
                    [
                        'title' => 'Annual Company Retreat 2024',
                        'description' => 'Team building activities and strategic planning sessions at our annual retreat.',
                        'image_path' => 'gallery/office-events/annual-retreat-2024.jpg',
                        'alt_text' => 'Employees participating in team building activities',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 456,
                    ],
                    [
                        'title' => 'Christmas Party 2024',
                        'description' => 'Our festive Christmas celebration with the entire team.',
                        'image_path' => 'gallery/office-events/christmas-party-2024.jpg',
                        'alt_text' => 'Christmas party decorations and team celebration',
                        'featured' => true,
                        'sort_order' => 2,
                        'views' => 389,
                    ],
                    [
                        'title' => 'Quarterly Town Hall Meeting',
                        'description' => 'CEO addressing the team during our quarterly all-hands meeting.',
                        'image_path' => 'gallery/office-events/town-hall-q4-2024.jpg',
                        'alt_text' => 'CEO presenting to employees in conference room',
                        'sort_order' => 3,
                        'views' => 234,
                    ],
                ];

            case 'member-activities':
                return [
                    [
                        'title' => 'Financial Planning Workshop',
                        'description' => 'Members learning about retirement planning strategies.',
                        'image_path' => 'gallery/member-activities/financial-planning-workshop.jpg',
                        'alt_text' => 'Financial advisor presenting to group of members',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 567,
                    ],
                    [
                        'title' => 'Investment Education Seminar',
                        'description' => 'Educational seminar on investment options and portfolio management.',
                        'image_path' => 'gallery/member-activities/investment-seminar.jpg',
                        'alt_text' => 'Members attending investment education session',
                        'sort_order' => 2,
                        'views' => 432,
                    ],
                    [
                        'title' => 'Member Appreciation Day',
                        'description' => 'Special event to appreciate our long-standing members.',
                        'image_path' => 'gallery/member-activities/member-appreciation-day.jpg',
                        'alt_text' => 'Members receiving appreciation certificates',
                        'sort_order' => 3,
                        'views' => 298,
                    ],
                ];

            case 'awards-recognition':
                return [
                    [
                        'title' => 'Best Pension Provider Award 2024',
                        'description' => 'Receiving the prestigious Best Pension Provider Award.',
                        'image_path' => 'gallery/awards/best-provider-award-2024.jpg',
                        'alt_text' => 'CEO receiving award trophy on stage',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 723,
                    ],
                    [
                        'title' => 'Excellence in Customer Service',
                        'description' => 'Recognition for outstanding customer service delivery.',
                        'image_path' => 'gallery/awards/customer-service-excellence.jpg',
                        'alt_text' => 'Team members with customer service award',
                        'sort_order' => 2,
                        'views' => 345,
                    ],
                ];

            case 'community-outreach':
                return [
                    [
                        'title' => 'School Donation Drive',
                        'description' => 'Donating educational materials to local schools.',
                        'image_path' => 'gallery/community/school-donation-drive.jpg',
                        'alt_text' => 'Team presenting educational materials to school children',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 456,
                    ],
                    [
                        'title' => 'Community Health Fair',
                        'description' => 'Sponsoring and participating in community health screening.',
                        'image_path' => 'gallery/community/health-fair.jpg',
                        'alt_text' => 'Medical professionals providing health screening',
                        'sort_order' => 2,
                        'views' => 289,
                    ],
                ];

            case 'facilities':
                return [
                    [
                        'title' => 'Modern Office Reception',
                        'description' => 'Our welcoming reception area with modern design.',
                        'image_path' => 'gallery/facilities/office-reception.jpg',
                        'alt_text' => 'Modern office reception with comfortable seating',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 234,
                    ],
                    [
                        'title' => 'Conference Room',
                        'description' => 'State-of-the-art conference room for meetings and presentations.',
                        'image_path' => 'gallery/facilities/conference-room.jpg',
                        'alt_text' => 'Professional conference room with presentation equipment',
                        'sort_order' => 2,
                        'views' => 178,
                    ],
                ];

            case 'team-photos':
                return [
                    [
                        'title' => 'Executive Leadership Team',
                        'description' => 'Professional portrait of our executive leadership team.',
                        'image_path' => 'gallery/team/executive-team.jpg',
                        'alt_text' => 'Professional photo of executive team members',
                        'featured' => true,
                        'sort_order' => 1,
                        'views' => 567,
                    ],
                    [
                        'title' => 'Customer Service Team',
                        'description' => 'Our dedicated customer service representatives.',
                        'image_path' => 'gallery/team/customer-service-team.jpg',
                        'alt_text' => 'Customer service team in professional attire',
                        'sort_order' => 2,
                        'views' => 345,
                    ],
                ];

            default:
                return [];
        }
    }
}
