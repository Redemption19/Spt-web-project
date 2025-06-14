<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Widgets\ChartWidget;

class EventStatusChart extends ChartWidget
{
    protected static ?string $heading = 'Events by Status';
    
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $statusCounts = Event::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $statusLabels = [
            'draft' => 'Draft',
            'published' => 'Published',
            'cancelled' => 'Cancelled',
            'completed' => 'Completed',
        ];

        $data = [];
        $labels = [];
        
        foreach ($statusLabels as $key => $label) {
            if (isset($statusCounts[$key])) {
                $data[] = $statusCounts[$key];
                $labels[] = $label;
            }
        }

        $colors = [
            'rgba(156, 163, 175, 0.8)',  // Gray for draft
            'rgba(34, 197, 94, 0.8)',    // Green for published
            'rgba(239, 68, 68, 0.8)',    // Red for cancelled
            'rgba(59, 130, 246, 0.8)',   // Blue for completed
        ];

        return [
            'datasets' => [
                [
                    'data' => $data,
                    'backgroundColor' => array_slice($colors, 0, count($data)),
                    'borderColor' => array_map(function($color) {
                        return str_replace('0.8', '1', $color);
                    }, array_slice($colors, 0, count($data))),
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'pie';
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
