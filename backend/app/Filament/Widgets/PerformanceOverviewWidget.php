<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Filament\Widgets\Widget;
use Illuminate\Contracts\View\View;

class PerformanceOverviewWidget extends Widget
{
    protected static string $view = 'filament.widgets.performance-overview';
    
    protected static ?int $sort = 1;
    
    protected int | string | array $columnSpan = 'full';

    protected function getViewData(): array
    {
        $topEvents = Event::withCount('registrations')
            ->orderBy('registrations_count', 'desc')
            ->limit(3)
            ->get();

        $topCategories = BlogCategory::withCount('posts')
            ->orderBy('posts_count', 'desc')
            ->limit(3)
            ->get();

        $recentBlogs = BlogPost::where('status', 'published')
            ->with(['author', 'category'])
            ->latest('published_at')
            ->limit(3)
            ->get();

        return [
            'topEvents' => $topEvents,
            'topCategories' => $topCategories, 
            'recentBlogs' => $recentBlogs,
            'totalRevenue' => $this->calculateTotalRevenue(),
            'avgEventCapacity' => $this->calculateAverageCapacity(),
        ];
    }

    private function calculateTotalRevenue(): float
    {
        return Event::where('status', '!=', 'cancelled')
            ->get()
            ->sum(function ($event) {
                return $event->price * $event->current_attendees;
            });
    }

    private function calculateAverageCapacity(): float
    {
        $events = Event::where('capacity', '>', 0)->get();
        if ($events->isEmpty()) {
            return 0;
        }

        $totalUtilization = $events->sum(function ($event) {
            return ($event->current_attendees / $event->capacity) * 100;
        });

        return round($totalUtilization / $events->count(), 1);
    }
}
