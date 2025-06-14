<?php

namespace App\Filament\Widgets;

use App\Models\NewsletterSubscription;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class NewsletterGrowthWidget extends BaseWidget
{
    protected function getStats(): array
    {
        // Total subscribers
        $totalSubscribers = NewsletterSubscription::count();
        $activeSubscribers = NewsletterSubscription::where('status', 'active')->count();
        $unsubscribed = NewsletterSubscription::where('status', 'unsubscribed')->count();
        $bounced = NewsletterSubscription::where('status', 'bounced')->count();
        
        // Recent growth
        $thisMonth = NewsletterSubscription::where('subscribed_at', '>=', now()->startOfMonth())->count();
        $lastMonth = NewsletterSubscription::whereBetween('subscribed_at', [
            now()->subMonth()->startOfMonth(),
            now()->subMonth()->endOfMonth()
        ])->count();
        
        $thisWeek = NewsletterSubscription::where('subscribed_at', '>=', now()->startOfWeek())->count();
        
        // Calculate growth rate
        $growthRate = $lastMonth > 0 
            ? round((($thisMonth - $lastMonth) / $lastMonth) * 100, 1)
            : 0;
            
        // Retention rate
        $retentionRate = $totalSubscribers > 0 
            ? round(($activeSubscribers / $totalSubscribers) * 100, 1)
            : 0;
            
        // Subscriber sources
        $websiteSubscribers = NewsletterSubscription::where('source', 'website')->count();
        $socialSubscribers = NewsletterSubscription::where('source', 'social_media')->count();

        return [
            Stat::make('Total Subscribers', number_format($totalSubscribers))
                ->description("{$activeSubscribers} active, {$unsubscribed} unsubscribed")
                ->descriptionIcon('heroicon-m-users')
                ->chart($this->getSubscriberChart())
                ->color('success'),
                
            Stat::make('Monthly Growth', $thisMonth)
                ->description($growthRate >= 0 ? "+{$growthRate}% vs last month" : "{$growthRate}% vs last month")
                ->descriptionIcon($growthRate >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->chart($this->getGrowthChart())
                ->color($growthRate >= 0 ? 'success' : 'danger'),
                
            Stat::make('Retention Rate', "{$retentionRate}%")
                ->description("Active vs total subscribers")
                ->descriptionIcon('heroicon-m-heart')
                ->chart($this->getRetentionChart())
                ->color($retentionRate >= 80 ? 'success' : ($retentionRate >= 60 ? 'warning' : 'danger')),
                
            Stat::make('Weekly Signups', $thisWeek)
                ->description("New subscribers this week")
                ->descriptionIcon('heroicon-m-user-plus')
                ->chart($this->getWeeklyChart())
                ->color('info'),
        ];
    }

    private function getSubscriberChart(): array
    {
        // Last 7 days subscription data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = NewsletterSubscription::whereDate('subscribed_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getGrowthChart(): array
    {
        // Last 7 months growth trend
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $count = NewsletterSubscription::whereYear('subscribed_at', $month->year)
                ->whereMonth('subscribed_at', $month->month)
                ->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getRetentionChart(): array
    {
        // Retention rate over last 7 months
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $total = NewsletterSubscription::where('subscribed_at', '<=', $month->endOfMonth())->count();
            $active = NewsletterSubscription::where('subscribed_at', '<=', $month->endOfMonth())
                ->where('status', 'active')->count();
            
            $rate = $total > 0 ? round(($active / $total) * 100) : 0;
            $data[] = $rate;
        }
        return $data;
    }

    private function getWeeklyChart(): array
    {
        // Last 7 weeks signup data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $weekStart = now()->subWeeks($i)->startOfWeek();
            $weekEnd = now()->subWeeks($i)->endOfWeek();
            $count = NewsletterSubscription::whereBetween('subscribed_at', [$weekStart, $weekEnd])->count();
            $data[] = $count;
        }
        return $data;
    }
}
