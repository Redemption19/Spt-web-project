<?php

namespace App\Filament\Widgets;

use App\Models\FormSubmission;
use Filament\Widgets\ChartWidget;

class FormEngagementPolarChart extends ChartWidget
{
    protected static ?string $heading = 'Form Engagement by Type';
    
    protected static ?int $sort = 13;

    protected function getData(): array
    {
        // In a real application, we'd query form submissions with engagement metrics
        // Here we'll use dummy data that simulates form types and their engagement scores
        
        $formTypes = [
            'contact' => ['count' => 45, 'engagement' => 72],
            'callback' => ['count' => 28, 'engagement' => 85],
            'pension_inquiry' => ['count' => 37, 'engagement' => 63],
            'complaint' => ['count' => 22, 'engagement' => 90],
            'feedback' => ['count' => 33, 'engagement' => 78],
        ];
        
        // Calculate weighted engagement scores
        $data = [];
        $labels = [];
        
        foreach ($formTypes as $type => $metrics) {
            $data[] = round($metrics['count'] * $metrics['engagement'] / 100); // Weighted engagement score
            $labels[] = ucwords(str_replace('_', ' ', $type));
        }

        return [
            'datasets' => [
                [
                    'data' => $data,
                    'backgroundColor' => [
                        'rgba(54, 162, 235, 0.7)',   // Blue
                        'rgba(255, 206, 86, 0.7)',   // Yellow
                        'rgba(75, 192, 192, 0.7)',   // Teal
                        'rgba(153, 102, 255, 0.7)',  // Purple
                        'rgba(255, 159, 64, 0.7)',   // Orange
                    ],
                    'borderColor' => [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'polarArea';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'r' => [
                    'ticks' => [
                        'beginAtZero' => true,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'position' => 'right',
                ],
                'tooltip' => [
                    'callbacks' => [
                        'label' => "
                            function(context) {
                                return context.chart.data.labels[context.dataIndex] + ': ' + context.raw;
                            }
                        ",
                    ],
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
