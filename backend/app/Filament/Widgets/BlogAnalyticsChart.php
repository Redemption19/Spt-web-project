<?php

namespace App\Filament\Widgets;

use App\Models\BlogPost;
use App\Models\BlogCategory;
use Filament\Widgets\ChartWidget;

class BlogAnalyticsChart extends ChartWidget
{
    protected static ?string $heading = 'Blog Views Analytics';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $posts = BlogPost::orderBy('views', 'desc')->limit(8)->get();
        
        return [
            'datasets' => [
                [
                    'label' => 'Views',
                    'data' => $posts->pluck('views')->toArray(),
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.8)',   // Blue
                        'rgba(16, 185, 129, 0.8)',   // Green
                        'rgba(239, 68, 68, 0.8)',    // Red
                        'rgba(245, 158, 11, 0.8)',   // Yellow
                        'rgba(139, 92, 246, 0.8)',   // Purple
                        'rgba(236, 72, 153, 0.8)',   // Pink
                        'rgba(14, 165, 233, 0.8)',   // Sky
                        'rgba(34, 197, 94, 0.8)',    // Emerald
                    ],
                    'borderColor' => [
                        'rgba(59, 130, 246, 1)',   // Blue
                        'rgba(16, 185, 129, 1)',   // Green
                        'rgba(239, 68, 68, 1)',    // Red
                        'rgba(245, 158, 11, 1)',   // Yellow
                        'rgba(139, 92, 246, 1)',   // Purple
                        'rgba(236, 72, 153, 1)',   // Pink
                        'rgba(14, 165, 233, 1)',   // Sky
                        'rgba(34, 197, 94, 1)',    // Emerald
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $posts->pluck('title')->map(function ($title) {
                return strlen($title) > 25 ? substr($title, 0, 25) . '...' : $title;
            })->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => 'bottom',
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
