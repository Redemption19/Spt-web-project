<?php

namespace App\Filament\Widgets;

use App\Models\FormSubmission;
use App\Models\ContactForm;
use App\Models\SurveyResponse;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class FormSubmissionMetricsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        // Form Submissions
        $totalSubmissions = FormSubmission::count();
        $pendingSubmissions = FormSubmission::where('status', 'pending')->count();
        $processedSubmissions = FormSubmission::where('status', 'processed')->count();
        $recentSubmissions = FormSubmission::where('created_at', '>=', now()->subDays(7))->count();
        
        // Contact Forms
        $totalContacts = ContactForm::count();
        $newContacts = ContactForm::where('status', 'new')->count();
        $urgentContacts = ContactForm::where('priority', 'urgent')->count();
        
        // Survey Responses
        $totalSurveys = SurveyResponse::count();
        $recentSurveys = SurveyResponse::where('created_at', '>=', now()->subDays(7))->count();
        
        // Calculate processing rate
        $processingRate = $totalSubmissions > 0 
            ? round(($processedSubmissions / $totalSubmissions) * 100, 1)
            : 0;

        return [
            Stat::make('Form Submissions', number_format($totalSubmissions))
                ->description("{$pendingSubmissions} pending, {$processedSubmissions} processed")
                ->descriptionIcon('heroicon-m-document-text')
                ->chart($this->getSubmissionChart())
                ->color('primary'),
                
            Stat::make('Contact Forms', number_format($totalContacts))
                ->description("{$newContacts} new, {$urgentContacts} urgent")
                ->descriptionIcon('heroicon-m-envelope')
                ->chart($this->getContactChart())
                ->color('warning'),
                
            Stat::make('Survey Responses', number_format($totalSurveys))
                ->description("{$recentSurveys} this week")
                ->descriptionIcon('heroicon-m-chart-bar')
                ->chart($this->getSurveyChart())
                ->color('info'),
                
            Stat::make('Processing Rate', "{$processingRate}%")
                ->description("Forms processed successfully")
                ->descriptionIcon('heroicon-m-check-circle')
                ->chart($this->getProcessingChart())
                ->color($processingRate >= 80 ? 'success' : ($processingRate >= 60 ? 'warning' : 'danger')),
        ];
    }

    private function getSubmissionChart(): array
    {
        // Last 7 days form submission data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = FormSubmission::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getContactChart(): array
    {
        // Last 7 days contact form data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = ContactForm::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getSurveyChart(): array
    {
        // Last 7 days survey response data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = SurveyResponse::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getProcessingChart(): array
    {
        // Processing efficiency over last 7 days
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $total = FormSubmission::whereDate('created_at', '<=', $date)->count();
            $processed = FormSubmission::whereDate('created_at', '<=', $date)
                ->whereIn('status', ['processed', 'replied'])->count();
            
            $rate = $total > 0 ? round(($processed / $total) * 100) : 0;
            $data[] = $rate;
        }
        return $data;
    }
}
