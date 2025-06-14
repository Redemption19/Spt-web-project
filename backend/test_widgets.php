<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== Testing Widget Database Queries ===\n\n";

try {
    // Test BlogEngagementWidget queries
    echo "Testing BlogEngagementWidget...\n";
    $totalPosts = App\Models\BlogPost::count();
    $publishedPosts = App\Models\BlogPost::published()->count();
    $draftPosts = App\Models\BlogPost::draft()->count();
    $totalViews = App\Models\BlogPost::sum('views') ?: 0;
    $popularPosts = App\Models\BlogPost::where('views', '>', 100)->count();
    $highViewPosts = App\Models\BlogPost::where('views', '>', 500)->count();
    echo "✓ BlogEngagementWidget queries successful\n";
    echo "  - Total Posts: {$totalPosts}\n";
    echo "  - Published: {$publishedPosts}, Draft: {$draftPosts}\n";
    echo "  - Total Views: {$totalViews}\n";
    echo "  - Popular Posts (>100 views): {$popularPosts}\n";
    echo "  - High-view Posts (>500 views): {$highViewPosts}\n\n";

} catch (Exception $e) {
    echo "✗ BlogEngagementWidget Error: " . $e->getMessage() . "\n\n";
}

try {
    // Test EventRegistrationStatsWidget queries
    echo "Testing EventRegistrationStatsWidget...\n";
    $totalEvents = App\Models\Event::count();
    $confirmedRegistrations = App\Models\EventRegistration::where('status', 'confirmed')->count();
    $pendingRegistrations = App\Models\EventRegistration::where('status', 'pending')->count();
    echo "✓ EventRegistrationStatsWidget queries successful\n";
    echo "  - Total Events: {$totalEvents}\n";
    echo "  - Confirmed Registrations: {$confirmedRegistrations}\n";
    echo "  - Pending Registrations: {$pendingRegistrations}\n\n";

} catch (Exception $e) {
    echo "✗ EventRegistrationStatsWidget Error: " . $e->getMessage() . "\n\n";
}

try {
    // Test other widgets
    echo "Testing other widget models...\n";
    $downloads = App\Models\Download::count();
    $formSubmissions = App\Models\FormSubmission::count();
    $newsletterSubs = App\Models\NewsletterSubscription::count();
    echo "✓ Other widget queries successful\n";
    echo "  - Downloads: {$downloads}\n";
    echo "  - Form Submissions: {$formSubmissions}\n";
    echo "  - Newsletter Subscriptions: {$newsletterSubs}\n\n";

} catch (Exception $e) {
    echo "✗ Other widgets Error: " . $e->getMessage() . "\n\n";
}

echo "Widget testing complete!\n";
