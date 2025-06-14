<?php

namespace App\Filament\Widgets;

use App\Models\BlogPost;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class BlogEngagementWidget extends BaseWidget
{
    protected function getStats(): array
    {
        // Get blog statistics
        $totalPosts = BlogPost::count();
        $publishedPosts = BlogPost::published()->count();
        $draftPosts = BlogPost::draft()->count();
        $recentPosts = BlogPost::where('created_at', '>=', now()->subDays(30))->count();
        
        // Calculate average views per post (simulated data for demo)
        $totalViews = BlogPost::sum('views') ?: rand(10000, 50000);
        $avgViewsPerPost = $totalPosts > 0 ? round($totalViews / $totalPosts) : 0;
          // Calculate engagement metrics
        $popularPosts = BlogPost::where('views', '>', 100)->count();
        $highViewPosts = BlogPost::where('views', '>', 500)->count();
        
        // Growth calculation
        $previousMonthPosts = BlogPost::whereBetween('created_at', [
            now()->subDays(60),
            now()->subDays(30)
        ])->count();
        
        $growth = $previousMonthPosts > 0 
            ? round((($recentPosts - $previousMonthPosts) / $previousMonthPosts) * 100, 1)
            : 0;

        return [
            Stat::make('Blog Posts', number_format($totalPosts))
                ->description("{$publishedPosts} published, {$draftPosts} drafts")
                ->descriptionIcon('heroicon-m-document-text')
                ->chart($this->getBlogChart())
                ->color('success'),
                
            Stat::make('Total Views', number_format($totalViews))
                ->description("Avg {$avgViewsPerPost} views per post")
                ->descriptionIcon('heroicon-m-eye')
                ->chart($this->getViewsChart())
                ->color('info'),
                  Stat::make('Popular Posts', $popularPosts)
                ->description("{$highViewPosts} high-view posts")
                ->descriptionIcon('heroicon-m-star')
                ->chart($this->getPopularityChart())
                ->color('warning'),
                
            Stat::make('Recent Growth', $recentPosts)
                ->description($growth >= 0 ? "+{$growth}% this month" : "{$growth}% this month")
                ->descriptionIcon($growth >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->chart($this->getGrowthChart())
                ->color($growth >= 0 ? 'success' : 'danger'),
        ];
    }

    private function getBlogChart(): array
    {
        // Generate last 7 days of blog post creation data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = BlogPost::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getViewsChart(): array
    {
        // Simulated views data for last 7 days
        return [120, 180, 250, 320, 280, 400, 380];
    }

    private function getPopularityChart(): array
    {
        // Simulated popularity trend
        return [15, 18, 22, 25, 30, 28, 35];
    }

    private function getGrowthChart(): array
    {
        // Last 7 days growth trend
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = BlogPost::whereDate('created_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }
}
