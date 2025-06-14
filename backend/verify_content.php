<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== CONTENT MANAGEMENT SYSTEM DATA VERIFICATION ===\n\n";

// Check Hero Sections
$heroSections = App\Models\HeroSection::all();
echo "HERO SECTIONS (" . $heroSections->count() . " total):\n";
foreach ($heroSections as $hero) {
    echo "- {$hero->page}: {$hero->title} " . ($hero->active ? '[ACTIVE]' : '[INACTIVE]') . "\n";
}

echo "\n";

// Check Testimonials
$testimonials = App\Models\Testimonial::all();
echo "TESTIMONIALS (" . $testimonials->count() . " total):\n";
foreach ($testimonials as $testimonial) {
    $stars = str_repeat('⭐', $testimonial->rating);
    $featured = $testimonial->featured ? '[FEATURED]' : '';
    echo "- {$testimonial->name} ({$testimonial->role}) - {$stars} {$featured}\n";
}

echo "\n";

// Check Downloads
$downloads = App\Models\Download::all();
echo "DOWNLOADS (" . $downloads->count() . " total):\n";
foreach ($downloads as $download) {
    echo "- {$download->title} ({$download->category}) - {$download->download_count} downloads\n";
}

echo "\n";

// Check Statistics
echo "=== STATISTICS ===\n";
echo "Active Hero Sections: " . App\Models\HeroSection::where('active', true)->count() . "\n";
echo "Featured Testimonials: " . App\Models\Testimonial::where('featured', true)->count() . "\n";
echo "Active Downloads: " . App\Models\Download::where('active', true)->count() . "\n";
echo "Total Download Count: " . App\Models\Download::sum('download_count') . "\n";

echo "\n=== VERIFICATION COMPLETE ===\n";
