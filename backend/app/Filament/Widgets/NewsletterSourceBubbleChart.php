<?php

namespace App\Filament\Widgets;

use App\Models\NewsletterSubscription;
use Filament\Widgets\ChartWidget;

class NewsletterSourceBubbleChart extends ChartWidget
{
    protected static ?string $heading = 'Newsletter Subscribers by Source & Engagement';
    
    protected static ?int $sort = 11;
    
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        // Group sources and calculate engagement
        $sources = ['website', 'event', 'referral', 'social', 'campaign', 'direct'];
        $datasets = [];
        
        // For each source, we'll create varying sizes of bubbles to represent engagement
        foreach ($sources as $index => $source) {
            // In a real-world scenario, these would be actual metrics
            $subscribers = rand(10, 100);
            
            $datasets[] = [
                'label' => ucfirst($source),
                'data' => [
                    [
                        'x' => $index * 2, 
                        'y' => $subscribers, 
                        'r' => $subscribers / 4, // radius based on subscriber count
                    ]
                ],
                'backgroundColor' => $this->getColorForSource($source),
            ];
        }

        return [
            'datasets' => $datasets,
        ];
    }
    
    private function getColorForSource(string $source): string
    {
        return match($source) {
            'website' => 'rgba(59, 130, 246, 0.7)',    // Blue
            'event' => 'rgba(16, 185, 129, 0.7)',      // Green
            'referral' => 'rgba(245, 158, 11, 0.7)',   // Yellow
            'social' => 'rgba(139, 92, 246, 0.7)',     // Purple
            'campaign' => 'rgba(239, 68, 68, 0.7)',    // Red
            'direct' => 'rgba(14, 165, 233, 0.7)',     // Sky
            default => 'rgba(107, 114, 128, 0.7)',     // Gray
        };
    }

    protected function getType(): string
    {
        return 'bubble';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'x' => [
                    'display' => false,
                ],
                'y' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Subscriber Count',
                    ],
                    'beginAtZero' => true,
                ],
            ],
            'plugins' => [
                'tooltip' => [
                    'callbacks' => [
                        'label' => "
                            function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' subscribers';
                            }
                        ",
                    ],
                ],
                'legend' => [
                    'position' => 'top',
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
            'aspectRatio' => 2,
        ];
    }
}
