<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\BlogPost;
use App\Models\Download;
use App\Models\FormSubmission;
use App\Models\NewsletterSubscription;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalEvents = Event::count();
        $totalRegistrations = EventRegistration::count();
        $totalBlogPosts = BlogPost::count();
        $totalBlogViews = BlogPost::sum('views') ?? 0;
        $totalDownloads = Download::sum('download_count') ?? 0;
        $totalSubscribers = NewsletterSubscription::count();
        $totalFormSubmissions = FormSubmission::count();
        $activeFiles = Download::where('active', true)->count();

        // Calculate growth metrics
        $recentRegistrations = EventRegistration::where('registered_at', '>=', now()->subWeek())->count();
        $lastWeekRegistrations = EventRegistration::where('registered_at', '>=', now()->subWeeks(2))
            ->where('registered_at', '<', now()->subWeek())->count();        $registrationGrowth = $lastWeekRegistrations > 0 
            ? round(($recentRegistrations - $lastWeekRegistrations) / $lastWeekRegistrations * 100, 1) 
            : ($recentRegistrations > 0 ? 100 : 0);
        
        $recentSubscribers = NewsletterSubscription::where('subscribed_at', '>=', now()->subWeek())->count();
        $lastWeekSubscribers = NewsletterSubscription::where('subscribed_at', '>=', now()->subWeeks(2))
            ->where('subscribed_at', '<', now()->subWeek())->count();        $subscriberGrowth = $lastWeekSubscribers > 0 
            ? round(($recentSubscribers - $lastWeekSubscribers) / $lastWeekSubscribers * 100, 1) 
            : ($recentSubscribers > 0 ? 100 : 0);
            
        $recentFormSubmissions = FormSubmission::where('created_at', '>=', now()->subWeek())->count();
        $lastWeekFormSubmissions = FormSubmission::where('created_at', '>=', now()->subWeeks(2))
            ->where('created_at', '<', now()->subWeek())->count();        $formGrowth = $lastWeekFormSubmissions > 0 
            ? round(($recentFormSubmissions - $lastWeekFormSubmissions) / $lastWeekFormSubmissions * 100, 1) 
            : ($recentFormSubmissions > 0 ? 100 : 0);

        // Get recent downloads - fallback to total downloads if last_downloaded_at is not yet available
        try {
            $recentDownloads = Download::where('last_downloaded_at', '>=', now()->subWeek())->sum('download_count') ?? 0;
        } catch (\Exception $e) {
            $recentDownloads = Download::where('created_at', '>=', now()->subWeek())->sum('download_count') ?? 0;
        }
        
        // Get upcoming events
        $upcomingEventsCount = Event::where('event_date', '>', now())->count();
              // Get recent blog performance
        $recentBlogViews = BlogPost::where('published_at', '>=', now()->subMonth())->sum('views') ?? 0;
        $lastMonthBlogViews = BlogPost::where('published_at', '>=', now()->subMonths(2))
            ->where('published_at', '<', now()->subMonth())->sum('views') ?? 0;
        $blogViewsGrowth = $lastMonthBlogViews > 0 
            ? round(($recentBlogViews - $lastMonthBlogViews) / $lastMonthBlogViews * 100, 1)
            : ($recentBlogViews > 0 ? 100 : 0);

        return [
            Stat::make('Total Events', number_format($totalEvents))
                ->description($upcomingEventsCount . ' upcoming events')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('success')
                ->chart([7, 12, 8, 15, 9, 13, $totalEvents]),
                
            Stat::make('Event Registrations', number_format($totalRegistrations))
                ->description(($registrationGrowth >= 0 ? '+' : '') . $registrationGrowth . '% this week')
                ->descriptionIcon('heroicon-m-user-group')
                ->color($registrationGrowth >= 0 ? 'info' : 'danger')
                ->chart([45, 52, 48, 61, 58, 72, $totalRegistrations]),
                  Stat::make('Blog Views', number_format($totalBlogViews))
                ->description(($blogViewsGrowth >= 0 ? '+' : '') . $blogViewsGrowth . '% vs last month')
                ->descriptionIcon('heroicon-m-eye')
                ->color($blogViewsGrowth >= 0 ? 'warning' : 'danger')
                ->chart([120, 180, 160, 250, 200, 300, max(1, $totalBlogViews / 10)]),
                
            Stat::make('Newsletter Subscribers', number_format($totalSubscribers))
                ->description(($subscriberGrowth >= 0 ? '+' : '') . $subscriberGrowth . '% this week')
                ->descriptionIcon('heroicon-m-envelope')
                ->color($subscriberGrowth >= 0 ? 'success' : 'danger')
                ->chart([85, 88, 92, 95, 97, 99, $totalSubscribers]),
                
            Stat::make('Form Submissions', number_format($totalFormSubmissions))
                ->description(($formGrowth >= 0 ? '+' : '') . $formGrowth . '% this week')
                ->descriptionIcon('heroicon-m-document-text')
                ->color($formGrowth >= 0 ? 'primary' : 'danger')
                ->chart([12, 18, 15, 22, 19, 25, $totalFormSubmissions]),
                  Stat::make('File Downloads', number_format($totalDownloads))
                ->description($recentDownloads . ' downloads this week')
                ->descriptionIcon('heroicon-m-arrow-down-tray')
                ->color('danger')
                ->chart([1200, 1800, 1600, 2200, 1900, 2500, max(1, $totalDownloads / 20)]),
        ];
    }
}
