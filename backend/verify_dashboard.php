<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== Filament Dashboard Verification ===\n\n";

// Check if models exist and have data
$models = [
    'App\Models\BlogPost' => 'Blog Posts',
    'App\Models\Event' => 'Events', 
    'App\Models\FormSubmission' => 'Form Submissions',
    'App\Models\NewsletterSubscription' => 'Newsletter Subscriptions',
    'App\Models\Download' => 'Downloads'
];

foreach ($models as $modelClass => $name) {
    try {
        if (class_exists($modelClass)) {
            $count = $modelClass::count();
            echo "✓ {$name}: {$count} records\n";
            
            // Check specific fields for analytics
            if ($modelClass === 'App\Models\BlogPost') {
                $totalViews = $modelClass::sum('views');
                echo "  Total blog views: {$totalViews}\n";
            }
            
            if ($modelClass === 'App\Models\Download') {
                $totalDownloads = $modelClass::sum('download_count');
                echo "  Total download count: {$totalDownloads}\n";
            }
        } else {
            echo "✗ {$name}: Model not found\n";
        }
    } catch (Exception $e) {
        echo "✗ {$name}: Error - " . $e->getMessage() . "\n";
    }
}

echo "\n=== Widget Classes ===\n";

$widgets = [
    'App\Filament\Widgets\StatsOverviewWidget',
    'App\Filament\Widgets\BlogEngagementWidget',
    'App\Filament\Widgets\FormSubmissionMetricsWidget', 
    'App\Filament\Widgets\NewsletterGrowthWidget',
    'App\Filament\Widgets\FileDownloadTrackingWidget',
    'App\Filament\Widgets\EventRegistrationStatsWidget'
];

foreach ($widgets as $widget) {
    if (class_exists($widget)) {
        echo "✓ {$widget}\n";
    } else {
        echo "✗ {$widget} - Not found\n";
    }
}

echo "\n=== Custom Dashboard ===\n";
if (class_exists('App\Filament\Pages\Dashboard')) {
    echo "✓ Custom Dashboard page exists\n";
} else {
    echo "✗ Custom Dashboard page not found\n";
}

if (file_exists(__DIR__ . '/resources/views/filament/pages/dashboard.blade.php')) {
    echo "✓ Custom Dashboard view exists\n";
} else {
    echo "✗ Custom Dashboard view not found\n";
}

echo "\n=== Database Tables ===\n";
$tables = ['blog_posts', 'events', 'form_submissions', 'newsletter_subscriptions', 'downloads'];

foreach ($tables as $table) {
    try {
        $exists = DB::select("SELECT 1 FROM {$table} LIMIT 1");
        echo "✓ Table '{$table}' exists and accessible\n";
    } catch (Exception $e) {
        echo "✗ Table '{$table}' error: " . $e->getMessage() . "\n";
    }
}

echo "\nVerification complete!\n";
