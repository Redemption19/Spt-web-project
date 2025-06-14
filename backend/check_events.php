<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Event;
use App\Models\EventSpeaker;
use App\Models\EventAgenda;
use App\Models\EventRegistration;

echo "=== EVENT SEEDER VERIFICATION ===\n\n";

echo "📊 Record Counts:\n";
echo "Events: " . Event::count() . "\n";
echo "Speakers: " . EventSpeaker::count() . "\n";
echo "Agenda Items: " . EventAgenda::count() . "\n";
echo "Registrations: " . EventRegistration::count() . "\n\n";

echo "🎯 Events Created:\n";
foreach (Event::all() as $event) {
    echo "- {$event->title} ({$event->status}) - {$event->date->format('M j, Y')}\n";
    echo "  Speakers: " . $event->speakers()->count() . " | ";
    echo "Agenda: " . $event->agenda()->count() . " | ";
    echo "Registrations: " . $event->registrations()->count() . "\n\n";
}

echo "✅ Seeding completed successfully!\n";
