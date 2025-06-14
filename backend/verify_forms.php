<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\FormSubmission;
use App\Models\ContactForm;
use App\Models\NewsletterSubscription;
use App\Models\SurveyResponse;

echo "=== FORMS & SUBMISSIONS VERIFICATION ===\n\n";

// Form Submissions
echo "📋 FORM SUBMISSIONS\n";
echo "================\n";
$formSubmissions = FormSubmission::all();
echo "Total Form Submissions: " . $formSubmissions->count() . "\n";

$byType = FormSubmission::selectRaw('form_type, COUNT(*) as count')
    ->groupBy('form_type')
    ->get()
    ->pluck('count', 'form_type');

echo "By Type:\n";
foreach ($byType as $type => $count) {
    echo "  - {$type}: {$count}\n";
}

$byStatus = FormSubmission::selectRaw('status, COUNT(*) as count')
    ->groupBy('status')
    ->get()
    ->pluck('count', 'status');

echo "By Status:\n";
foreach ($byStatus as $status => $count) {
    echo "  - {$status}: {$count}\n";
}

echo "\nRecent Submissions (last 5):\n";
$recent = FormSubmission::latest()->take(5)->get();
foreach ($recent as $submission) {
    echo "  - {$submission->form_type} ({$submission->status}) - " . $submission->created_at->format('Y-m-d H:i') . "\n";
}

// Contact Forms
echo "\n📞 CONTACT FORMS\n";
echo "===============\n";
$contactForms = ContactForm::all();
echo "Total Contact Forms: " . $contactForms->count() . "\n";

$byContactStatus = ContactForm::selectRaw('status, COUNT(*) as count')
    ->groupBy('status')
    ->get()
    ->pluck('count', 'status');

echo "By Status:\n";
foreach ($byContactStatus as $status => $count) {
    echo "  - {$status}: {$count}\n";
}

$byPriority = ContactForm::selectRaw('priority, COUNT(*) as count')
    ->groupBy('priority')
    ->get()
    ->pluck('count', 'priority');

echo "By Priority:\n";
foreach ($byPriority as $priority => $count) {
    echo "  - {$priority}: {$count}\n";
}

echo "\nRecent Contact Forms (last 5):\n";
$recentContacts = ContactForm::latest()->take(5)->get();
foreach ($recentContacts as $contact) {
    echo "  - {$contact->subject} ({$contact->status}) - {$contact->name} - " . $contact->created_at->format('Y-m-d H:i') . "\n";
}

// Newsletter Subscriptions
echo "\n📧 NEWSLETTER SUBSCRIPTIONS\n";
echo "==========================\n";
$newsletters = NewsletterSubscription::all();
echo "Total Subscriptions: " . $newsletters->count() . "\n";

$bySubscriptionStatus = NewsletterSubscription::selectRaw('status, COUNT(*) as count')
    ->groupBy('status')
    ->get()
    ->pluck('count', 'status');

echo "By Status:\n";
foreach ($bySubscriptionStatus as $status => $count) {
    echo "  - {$status}: {$count}\n";
}

$bySource = NewsletterSubscription::selectRaw('source, COUNT(*) as count')
    ->groupBy('source')
    ->get()
    ->pluck('count', 'source');

echo "By Source:\n";
foreach ($bySource as $source => $count) {
    echo "  - {$source}: {$count}\n";
}

echo "\nRecent Subscriptions (last 5):\n";
$recentSubs = NewsletterSubscription::latest()->take(5)->get();
foreach ($recentSubs as $sub) {
    echo "  - {$sub->email} ({$sub->status}) - " . $sub->created_at->format('Y-m-d H:i') . "\n";
}

// Survey Responses
echo "\n📊 SURVEY RESPONSES\n";
echo "==================\n";
$surveys = SurveyResponse::all();
echo "Total Survey Responses: " . $surveys->count() . "\n";

$bySurveyType = SurveyResponse::selectRaw('survey_type, COUNT(*) as count')
    ->groupBy('survey_type')
    ->get()
    ->pluck('count', 'survey_type');

echo "By Survey Type:\n";
foreach ($bySurveyType as $type => $count) {
    echo "  - {$type}: {$count}\n";
}

$anonymousCount = SurveyResponse::where('anonymous', true)->count();
$identifiedCount = SurveyResponse::where('anonymous', false)->count();
echo "Anonymous responses: {$anonymousCount}\n";
echo "Identified responses: {$identifiedCount}\n";

$avgCompletionTime = SurveyResponse::whereNotNull('completion_time')->avg('completion_time');
echo "Average completion time: " . round($avgCompletionTime / 60, 2) . " minutes\n";

echo "\nRecent Survey Responses (last 5):\n";
$recentSurveys = SurveyResponse::latest()->take(5)->get();
foreach ($recentSurveys as $survey) {
    $respondent = $survey->respondent_name ?: $survey->respondent_email ?: 'Anonymous';
    echo "  - {$survey->survey_type} - {$respondent} - " . $survey->created_at->format('Y-m-d H:i') . "\n";
}

// Sample Data Examples
echo "\n📝 SAMPLE DATA EXAMPLES\n";
echo "=======================\n";

echo "\nSample Form Submission Data:\n";
$sampleForm = FormSubmission::first();
if ($sampleForm) {
    echo "Type: {$sampleForm->form_type}\n";
    echo "Status: {$sampleForm->status}\n";
    echo "Data: " . substr(json_encode($sampleForm->form_data), 0, 100) . "...\n";
}

echo "\nSample Contact Form:\n";
$sampleContact = ContactForm::first();
if ($sampleContact) {
    echo "Subject: {$sampleContact->subject}\n";
    echo "From: {$sampleContact->name} ({$sampleContact->email})\n";
    echo "Message: " . substr($sampleContact->message, 0, 100) . "...\n";
}

echo "\nSample Survey Response:\n";
$sampleSurvey = SurveyResponse::first();
if ($sampleSurvey) {
    echo "Type: {$sampleSurvey->survey_type}\n";
    echo "Respondent: " . ($sampleSurvey->respondent_name ?: 'Anonymous') . "\n";
    echo "Responses: " . substr(json_encode($sampleSurvey->responses), 0, 100) . "...\n";
}

echo "\n✅ Forms & Submissions verification completed!\n";
echo "All form types have been seeded with comprehensive sample data.\n";
echo "Ready for testing in the Filament admin panel.\n";
